import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

interface NavOptionProps {
    path: string;
}

const NavOption = (props: NavOptionProps) => {
    const history = useHistory();
    return (
        <button onClick={() => {history.push(props.path)}}>
            {props.path}
        </button>
    )
}

const NavBar = () => {
    return (
        <Box display='flex' flexDirection='row'>
            <NavOption path="/" />
            <NavOption path="/svg-editor" />
            <NavOption path="/roman" />
            <NavOption path="/maze" />
        </Box>
    )
}

export default NavBar;