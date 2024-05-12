import React from "react";
import { Input, Button } from "@nextui-org/react";

export default function UpdateForm({ username, email, desc, setUsername, setEmail, setDesc }) {
    return (
        <form action="post">
            <div className={`m-4 flex w-full flex-col justify-center items-center gap-4`}>
                <Input type="text" label="Username" placeholder="johnDoe@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="email" label="Email" placeholder="John Doe" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="text" label="Description" placeholder="I'm great at quiZz riZz 😎😉" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
        </form>
    );
}
