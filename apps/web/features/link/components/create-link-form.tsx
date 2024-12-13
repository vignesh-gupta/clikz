"use client";

import { useState } from "react";

import { Globe, Image, Plus, QrCode, RefreshCcw, X } from "lucide-react";

import { Badge } from "@clikz/ui/components/ui/badge";
import { Button } from "@clikz/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";
import { Input } from "@clikz/ui/components/ui/input";
import { Label } from "@clikz/ui/components/ui/label";
import { Textarea } from "@clikz/ui/components/ui/textarea";

const CreateLinkForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Create New Link
          </div>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination URL</Label>
              <Input id="destination" placeholder="https://example.com/" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortlink">Custom Short Link</Label>
              <div className="flex gap-2">
                <Input placeholder="clik.z/" className="w-1/3" />
                <Input placeholder="your-custom-slug" className="flex-1" />
                <Button variant="outline" size="icon">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Add tags... (Press Enter to add)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                placeholder="Add comments (optional)"
                className="h-32"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label>QR Code</Label>
            <div className="border rounded-lg h-48 flex items-center justify-center bg-muted relative overflow-hidden">
              <QrCode className="h-6 w-6 absolute top-2 right-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center px-4">
                Enter a short link to generate a QR code
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Link Preview</Label>
            <div className="border rounded-lg h-48 flex items-center justify-center bg-muted relative overflow-hidden">
              <Image className="h-6 w-6 absolute top-2 right-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center px-4">
                Enter a valid URL to generate a preview
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button>
            Create Link
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
