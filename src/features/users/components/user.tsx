"use client";

import {
  EntityContainer,
  EntityHeader,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { useSuspenseUser, useUpdateUser } from "../hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const UserHeader = () => {
  return (
    <EntityHeader
      title="Profile"
      description="Manage your profile settings here"
    />
  );
};

export const UserContainer = ({ children }: { children: React.ReactNode }) => {
  return <EntityContainer header={<UserHeader />}>{children}</EntityContainer>;
};

export const UserLoading = () => {
  return <LoadingView message="Loading profile..." />;
};

export const UserError = () => {
  return <ErrorView message="Error loading profile..." />;
};

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(255),
  lastName: z.string().min(1, "Last Name is required").max(255),
  email: z.email(),
});

type FormValues = z.infer<typeof formSchema>;

export const UserProfileDetails = () => {
  const { data: user } = useSuspenseUser();
  const updateUser = useUpdateUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await updateUser.mutateAsync(values);
  };

  return (
    <>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-lg mb-4 font-medium">
            Basic Information
          </CardTitle>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="cursor-not-allowed"
                          readOnly
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};
