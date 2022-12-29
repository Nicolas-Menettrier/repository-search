import { useEffect, useMemo, useState } from "react";

import { GithubRepositoryResponse, Repository } from "types/repository.types";

/**
 * Throttle a function to avoid too many API calls
 *
 * @param callback - function to throttle
 * @param delay - delay in ms
 * @returns
 */
function throttle(callback: (...args: Array<any>) => void, delay: number) {
  let wait: boolean = false;
  let pastArgs: Array<any> | null = null;

  const checkArgs = () => {
    if (pastArgs === null) {
      wait = false;
    } else {
      callback(...pastArgs);
      pastArgs = null;
      setTimeout(checkArgs, delay);
    }
    return;
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

/**
 * Hook to fetch repositories from github API
 *
 * @param search - search string for github API
 * @param page - page number
 * @param rowPerPage - number of items per page
 * @param {number} [throttling = 300] - delay in ms between API calls, default to 300ms
 * @returns
 */
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
    return throttle((search: string, page: number, itemPerPage: number) => {
      if (search) {
        fetch(
          `https://api.github.com/search/repositories?q=${search}&page=${page}&per_page=${itemPerPage}&sort=stars&order=desc`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              ...(process.env.REACT_APP_GITHUB_TOKEN
                ? {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
                  }
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
            setRepositories([
              {
                id: 780,
                owner: {
                  avatar_url:
                    "https://i.pinimg.com/originals/93/15/8d/93158d512d5982b3f2dcfe62849050a5.jpg",
                  login: "Error fetching",
                },
                full_name: "Something went wrong, please try again later.",
                description:
                  "contact me at https://github.com/Nicolas-Menettrier",
                html_url: "https://github.com/Nicolas-Menettrier",
              },
            ]);
            setTotalCount(1);
          });
      } else {
        setRepositories([]);
        setTotalCount(0);
      }
    }, throttling);
  }, [throttling]);

  useEffect(() => {
    throttledFetch(search, page, rowPerPage);
  }, [search, page, rowPerPage, throttledFetch]);

  return { repositories, totalCount };
}

export default useRepositories;
