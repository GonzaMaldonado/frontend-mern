import React, {useState} from 'react';
import {Tab, Button} from "semantic-ui-react";
import {BasicModal} from "../../../components/Shared";
import {UserForm, ListUsers} from "../../../components/Admin/Users";
import "./Users.scss";

export function Users() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onReload = () => setReload((prevState) => !prevState);//118 al abrir el modal me genera banda de warnings

    const panes = [
        {
            menuItem: "Usuarios activos",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListUsers usersActive={true} reload={reload} onReload={onReload} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Usuarios inactivos",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListUsers usersActive={false} reload={reload} onReload={onReload} />
                </Tab.Pane>
            )
        },
    ];
    return (
        <>
            <div className="users-page">
                <Button className="users-page__add" primary onClick={onOpenCloseModal}>
                    Nuevo Usuario
                </Button>
                <Tab menu={{ secondary: true}} panes={panes} />
            </div>

            <BasicModal 
              show={showModal} 
              close={onOpenCloseModal} 
              title="Crear nuevo usuario"
            >
                <UserForm close={onOpenCloseModal} onReload={onReload} />
            </BasicModal>
        </>
    );
}
