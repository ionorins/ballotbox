import App from "./App";
import { render, screen } from '@testing-library/react';
import Signup from "./Components/Access/Signup";
import Login from "./Components/Access/Login";
import TitleLogo from "./Components/Utils/TitleLogo";
import Qr from "./Components/Utils/Qr";
import {PrevIcon, NextIcon} from "./Components/Utils/CarouselIcons"
import {Component} from "react";
import NewEvent from "./Components/Host/NewEvent";
import DeleteEvent from "./Components/Host/DeleteEvent";
import Logout from "./Components/Access/Logout";
import Event from "./Components/Attendee/Event";

it("renders App without crashing", () => { render(<App />); });
it("renders Signup without crashing", () => { render(<Signup />);});
it("renders Login without crashing", () => { render(<Login />);});
it("renders Utilities without crashing", () => { render(<TitleLogo />); render(<NextIcon/>); render(<PrevIcon />)});
it("renders Modals without crashing", () => { render(<NewEvent />); render(<DeleteEvent />); render(<Logout />);});
