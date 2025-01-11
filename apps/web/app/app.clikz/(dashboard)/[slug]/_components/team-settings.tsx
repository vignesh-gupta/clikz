"use client";

import { useState } from "react";

import { Link2, MoreVertical } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@clikz/ui/components/ui/avatar";
import { Button } from "@clikz/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

export default function TeamSettings() {
  const [members] = useState<Member[]>([
    {
      id: "1",
      name: "Vignesh Gupta",
      email: "vignesh@example.com",
      role: "Owner",
      avatar: "https://github.com/shadcn.png",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">People</h2>
          <p className="text-sm text-muted-foreground">
            Teammates that have access to this workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Link2 className="h-4 w-4" />
            <span className="sr-only">Copy invite link</span>
          </Button>
          <Button>Invite</Button>
        </div>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4 px-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {member.role}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Change role</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Remove member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="invitations" className="px-4">
          <div className="text-sm text-muted-foreground py-4">
            No pending invitations
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
