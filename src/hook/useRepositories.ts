import { useEffect, useMemo, useState } from "react";

import { GithubRepositoryResponse, Repository } from "types/repository.types";

function throttle(callback: (...args: Array<any>) => void, delay: number) {
  let wait: boolean = false;
  let pastArgs: Array<any> | null = null;

  const checkArgs = () => {
    if (pastArgs === null) {
      wait = false;
      return;
    }

    callback(...pastArgs);
    pastArgs = null;
    setTimeout(checkArgs, delay);
  };

  return (...args: Array<any>) => {
    if (wait) {
      pastArgs = args;
      return;
    }

    callback(...args);
    wait = true;
    setTimeout(checkArgs, delay);
  };
}

function useRepositories(
  search: string,
  page: number,
  rowPerPage: number,
  throttling = 300
): {
  repositories: Repository[];
  totalCount: number;
} {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const throttledFetch = useMemo(() => {
    return throttle((search: string, page: number) => {
      fetch(
        `https://api.github.com/search/repositories?q=${search}&page=${page}&per_page=${rowPerPage}&sort=stars&order=desc`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.REACT_APP_GITHUB_TOKEN
              ? { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` }
              : {}),
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data: GithubRepositoryResponse) => {
          setRepositories(data.items);
          setTotalCount(data.total_count);
        })
        .catch(() => {
          setRepositories([]);
          setTotalCount(0);
        });
    }, throttling);
  }, [throttling, rowPerPage]);

  useEffect(() => {
    if (!search) {
      setRepositories([]);
      setTotalCount(0);
      return;
    }

    throttledFetch(search, page);
  }, [search, page, throttledFetch]);

  return { repositories, totalCount };
}

export default useRepositories;
