"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, Users } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DownloadBanner from "@/components/Download";

export default function ContactPage() {
  const form = useForm();

  return (
    <>
    <div className="relative">
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/contact.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>

          <div className="mt-12  rounded-lg bg-white p-8 shadow-lg absolute w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => console.log(data))}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    name="firstName"
                    render={() => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastName"
                    render={() => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    name="email"
                    render={() => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@flowbite.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="phone"
                    render={() => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+12 345 6789" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="message"
                  render={() => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Leave a comment..."
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="terms"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I confirm that I have read and agree to our{" "}
                          <Link
                            href="#"
                            className="text-primary hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="#"
                            className="text-primary hover:underline"
                          >
                            Privacy Statement
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Send message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="bg-gray-950 flex items-end text-white py-12 min-h-screen mt-52 md:mt-0">
        <div className="container mx-auto h-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="mx-auto h-8 w-8 text-gray-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Email us:
              </h2>
              <p className="mb-2 text-sm">
                Email us for general queries, including marketing and
                partnership opportunities.
              </p>
              <a
                href="mailto:hello@flowbite.com"
                className="text-white hover:text-gray-300"
              >
                hello@wardrobe.com
              </a>
            </div>
            <div className="text-center">
              <Phone className="mx-auto h-8 w-8 text-gray-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Call us:
              </h2>
              <p className="mb-2 text-sm">
                Call us to speak to a member of our team. We are always happy to
                help.
              </p>
              <a
                href="tel:+16467865060"
                className="text-white hover:text-gray-300"
              >
                +1 (646) 786-5060
              </a>
            </div>
            <div className="text-center">
              <Users className="mx-auto h-8 w-8 text-gray-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Support</h2>
              <p className="mb-4 text-sm">
                Email us for general queries, including marketing and
                partnership opportunities.
              </p>
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-gray-200"
              >
                Support center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DownloadBanner/>
    </>
  );
}
