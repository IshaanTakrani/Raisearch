"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function SourcesTab() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    console.log("Submitted URL:", url);
    // 🔗 TODO: send to backend or handle state
    setUrl("");
  };

  return (
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Add a Source</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </CardContent>
      </form>

      {/* <CardFooter className="text-sm text-muted-foreground">
        Paste a valid URL and click submit.
      </CardFooter> */}
    </Card>
  );
}

export default SourcesTab;
