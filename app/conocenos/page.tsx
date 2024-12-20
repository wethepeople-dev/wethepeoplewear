import { Metadata } from "next";
import ConocenosContent from "./ConocenosContent";

export const metadata: Metadata = {
    title: "Conócenos",
    description: "Conoce más sobre We The People Wear y nuestra misión.",
};

export default function Conocenos() {
    return <ConocenosContent />;
}
