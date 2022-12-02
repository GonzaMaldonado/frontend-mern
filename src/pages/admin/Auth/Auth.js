import React, {useState} from 'react';
import {Tab} from "semantic-ui-react";
import {RegisterForm, LoginForm} from "../../../components/Admin/Auth";
import {Icon} from "../../../assets";
import "./Auth.scss";

export function Auth() {
    const [activeIndex, setActiveIndex] = useState(0);

    const openLogin = () => setActiveIndex(0);

    const panes = [
        {
            menuItem: "Iniciar Sesión",
            render: () => (
                <Tab.Pane>
                    <LoginForm />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Nuevo Usuario",
            render: () => (
                <Tab.Pane>
                    <RegisterForm openLogin={openLogin} />
                </Tab.Pane>
            )
        }
    ];

    return (
        <div className="auth">
            <Icon.LogoWhite className="logo" />
            
            <Tab 
              panes={panes} 
              className="auth__form" 
              activeIndex={activeIndex} 
              onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
            />
        </div>
    );
}
