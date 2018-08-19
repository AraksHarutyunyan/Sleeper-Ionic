## **TODO:**

    - Get data by year from EntryCollection
    - FIREBASE to store data (or sqlite?)

    - SleepEntry page needs some setting up. Use ngIf to display wake/sleep time if existing.

    - Organise entries by month or by year, if more than 12 months

    - Add New Entry manual creation in Calendar


    - Add Popup Sleep Time page at sleep time (set in settings for 8 hours "How many hours give you a good rest?")

    - Add Popup Wake Time page at Wake Time (set at account creation: "When do you want to wake up?" )
    - Add retroactive sleep-time add for entry if no corresponding wake-time

    - Make stats work

    - Create Login page
    - Create Account setup (Settings)

    -Diff color event blips for Calendar

## **DOING:**

## **DONE:**

    - Created Stats page
    - - Created Entry-List page
    - - Created Calendar page
    - - Created Sleep Entry page

    - Found Stats module
    - Found Calendar module

    - Set List logic for events
    - Made Entry data model

    - Created navigation between List and SleepEntry
    - Create EntryCollection model that holds all entries and has organising methods (returns by month or year or specific day) - Add New Entry manual creation in List

    - Setup sharing the same EntryCollection between pages?

    - Refactored methods for EntryCollection model. Now uses a rough pipeline to return structured data.
    - EntryList now configures entries received and uses months as list-dividers
    -
    - Create "Create New Entry" page. It makes an Entry model and stores it in EntryCollection. DO WE NEED THIS? See: Only make new entries when I missed complete days. Do I want to ask user to fill in days, or just encourage them to move on?
    -
    - Link Calendar DaySelect to Entry
