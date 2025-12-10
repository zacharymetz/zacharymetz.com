---
title: Subbing in Vite for Webpack
description: this is the description
date: 07-12-2025
time-to-read: 5m
---

Webpack has been around since 2015
it powers so much of the web
but its slow, when i want to recompile i want ms not seconds so i can see my changes
Ive been using this website as a way to learn how react ssr works under the hood the same way nextjs works. So i started with webpack and it was slow to update the app, like painful since i needed to work on full re renders
I decided to figure out how vite worked and see if could swap it out to make times even faster than nextjs.
oh boy i was not disapointed, recompile times were 50 ms and build times were measred in 100 ms not seconds.

I started this journy since i wanted to make an ssr app where i knew every line of code that was running, its led me to scutinize how build shit works

The main reason it can do this is becasue it written in go and not java script. But im all for it
the only languge we have on the frontend is js unfortunatly so we have to use it, on the server we could use something other than js but the toolchian is just to tight. I look forward to a day where the ssr support in go is close to what it is in javascript so that we can use go on the backend. but nodejs is still acceptable.

vite also does something cool, it only updates the portion of the code you update in development, neat !

swapping out these tools has made developer experince nicer

this is what my original webpack setup was

- ssr and then front end takes over

and this is how i changed it over to vite

here are the time comparisons
