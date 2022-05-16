# Lesson 6

<- Back to [previous lesson]()

---

## Goal

The goal of this lesson is to get an overview of how the Atlas Functions and HTTPS Endpoints are set up in the Atlas dashboard.

## Task 1: Open the Atlas Data API App

You can get to the Atlas Data API App in two ways:
1. From the Atlas dashboard, select **Database** from the left menu, then select the **Linked Atlas App**.
1. From the Atlas dashboard, select the **Atlas App Services** tab, then select the **Data API App**.

From this page, you can see the Functions, HTTPS Endpoints, and other settings for the Data API App.

## Task 1: HTTPS Endpoints

Select **HTTPS Endpoints** from the left menu.

Here you will see the list of pre-generated HTTPS Endpoints from the Data API. Choose the `find` endpoint. 

Within this endpoint, you will see the Atlas Function that it calls. 

Since we'll be customizing user authentication in the following lesson, we'll need to set the **Create User Upon Authentication** option to `On`.

## Task 2: Atlas Functions

Select **Functions** from the left menu.

Here you will see all of the serverless functions that are pre-generated by the Data API.

Open the `find` function to see the code.

## TEMP TASK: Create a custom endpoint

1. Select **HTTPS Endpoints** from the left menu.
1. Click **Add An Endpoint**.
1. Route: `/createUser`
1. Method: `POST`
1. Respond With Result: On
1. Add a new function:
  - Function Name: `createUser`
  - Leave defaut function.
1. Create User Upon Authentication: On
1. Save.

---

Great job! Let's move on to the [next lesson]() ->
