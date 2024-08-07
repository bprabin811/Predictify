'use client';

import { Link, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ReportAnIssue() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="p-2 mb-2 w-full flex items-center justify-start gap-4 border rounded-md cursor-pointer">
          <MessageCircle size={16} />
          <h3 className="font-normal">Send Feedback</h3>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[520px]">
        <div>
          <CardHeader>
            <CardTitle>Report an issue</CardTitle>
            <CardDescription>What area are you having problems with?</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="area">Area</Label>
                <Select defaultValue="billing">
                  <SelectTrigger id="area">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="deployments">Deployments</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="security-level">Security Level</Label>
                <Select defaultValue="2">
                  <SelectTrigger id="security-level" className="line-clamp-1 w-[160px] truncate">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Severity 1 (Highest)</SelectItem>
                    <SelectItem value="2">Severity 2</SelectItem>
                    <SelectItem value="3">Severity 3</SelectItem>
                    <SelectItem value="4">Severity 4 (Lowest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="I need help with.." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please include all information relevant to your issue."
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
