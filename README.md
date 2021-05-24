# My reminders using Vercel API serverless functions ⏰ 🚀

[![Actions Status](https://github.com/alexmarqs/my-reminders-serverless-api/workflows/My%20reminders%20workflow/badge.svg)](https://github.com/alexmarqs/my-reminders-serverless-api/actions)

This repository contains some serverless functions that I'm using to periodically remind me about personal stuff. I'm deploying these functions with the cloud platform Vercel (internally they use the AWS to host functions as lambdas).

Available API endpoints:

- `api/reminders`: Read my personal reminders from **Notion** and send them by a **SMS (via Twilio)** to my phone number;

## Scheduled/cron job to call my API endpoints

There are multiple options for this. I can create my own scheduler job system, use one of the existing online cron services (easycron, cron-job.org, etc.) or use the main cloud providers (AWS, Google Cloud, Azure) that also have cron services available. However, in this case I'm using the **Github Actions** to create a scheduled job to invoke my API, check the folder `.github/workflows` for more details.

## Prerequisites

Install Vercel globally to be able to run the project and deploy it later.

```
npm install -g vercel
```

The required environemnt variables (see `.env.example`) must be configured.

## Deployment

To replicate the Vercel deployment environment locally without requiring a deploy each time a change is made, execute:

```
vercel dev
```

To test the cron jobs against the API serverless functions during the development I can use the [ngrok](https://ngrok.com/) in order to expose them to the world through my local machine.

To create a deployment for a production environemnt, execute:

```
vercel --prod
```
