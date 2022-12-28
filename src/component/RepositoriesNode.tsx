import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import { Repository } from "types/repository.types";

interface IReposioriesNodeProps {
  repository: Repository;
}

const RepositoriesNode: React.FC<IReposioriesNodeProps> = ({ repository }) => {
  return (
    <ListItem
      onClick={() => {
        window.open(repository.html_url, "_blank");
      }}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          transform: "scale(1.01)",
          transition: "all 0.1s ease-in-out",
        },
      }}
      alignItems="flex-start"
      divider
    >
      <ListItemAvatar>
        <Avatar
          src={repository.owner.avatar_url}
          alt={`${repository.owner.login} github avatar`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={repository.full_name}
        secondary={repository.description}
      />
    </ListItem>
  );
};

export default RepositoriesNode;
