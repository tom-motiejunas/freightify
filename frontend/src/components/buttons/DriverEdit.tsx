import React from "react";
import {
  useCan,
  useNavigation,
  useTranslate,
  useResource,
  useRouterContext,
} from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
import { Button } from "@mui/material";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { EditButtonProps } from "../types";

export const EditButton: React.FC<EditButtonProps> = ({
  resourceNameOrRouteName,
  recordItemId,
  hideText = false,
  accessControl,
  ignoreAccessControlProvider = false,
  svgIconProps,
  children,
  onClick,
  ...rest
}) => {
  const accessControlEnabled =
    accessControl?.enabled ?? !ignoreAccessControlProvider;
  const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
  const { resourceName, resource, id } = useResource({
    resourceNameOrRouteName,
    recordItemId,
  });

  const translate = useTranslate();

  const { editUrl: generateEditUrl } = useNavigation();
  const { Link } = useRouterContext();

  const { data } = useCan({
    resource: resourceName,
    action: "DriverEdit",
    params: { id, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  const editUrl = generateEditUrl(resource.route!, id!);

  const { sx, ...restProps } = rest;

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Link
      to={editUrl}
      replace={false}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (data?.can === false) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      style={{ textDecoration: "none" }}
    >
      <Button
        disabled={data?.can === false}
        startIcon={
          !hideText && (
            <AssignmentTurnedInOutlinedIcon
              sx={{ selfAlign: "center" }}
              {...svgIconProps}
            />
          )
        }
        title={disabledTitle()}
        sx={{ minWidth: 0, ...sx }}
        data-testid={RefineButtonTestIds.EditButton}
        {...restProps}
      >
        {hideText ? (
          <AssignmentTurnedInOutlinedIcon fontSize="small" {...svgIconProps} />
        ) : (
          children ?? translate("buttons.edit", "Edit")
        )}
      </Button>
    </Link>
  );
};
