import App from "./App";
import { render, screen } from '@testing-library/react';
import Access from "./Components/Access/Access";
import Entry from "./Components/Access/Entry";
import Host from "./Components/Host/Host";
import Event from "./Components/Attendee/Event";

it("renders App without crashing", () => { render(<App/>); });
it("renders Access without crashing", () => { render(<Access/>); });
it("renders Entry without crashing", () => { render(<Entry/>); });
it("renders Host without crashing", () => { render(<Host/>); });
it("renders Event without crashing", () => { render(<Event/>); });
