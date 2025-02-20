### How long did you spend on the coding test?

I spent approximately 12 hours on the coding test. This includes setting up the project, implementing core functionality, styling the UI, handling state management, debugging, and adding additional features like filtering, sorting, and search functionality.

### What was the most useful feature that was added to the latest version of your chosen language?

The latest version of JavaScript (ES2022/ES13) introduced several useful features. One of the most useful ones is Array.prototype.at(), which allows accessing elements using negative indexing, making array manipulation more intuitive.

Example Usage:

const tasks = ["Task 1", "Task 2", "Task 3"];
console.log(tasks.at(-1)); // Outputs: "Task 3"

I used this feature in my application to efficiently retrieve the last item from lists without needing array.length - 1 calculations.

### How would you track down a performance issue in production? Have you ever had to do this?

Tracking performance issues in production requires a combination of monitoring, profiling, and debugging tools. The steps I would follow include:

Use Browser Developer Tools (Chrome DevTools, Firefox Profiler) – Check network requests, JavaScript execution time, and rendering bottlenecks.

### If you had more time, what additional features or improvements would you consider adding to the task management application?

Given more time, I would enhance the application with the following features:

Drag-and-Drop Task Reordering – Allow users to rearrange tasks using libraries like react-beautiful-dnd.

Recurring Tasks – Add the ability to set tasks to repeat daily, weekly, or monthly.

Notifications & Reminders – Send browser or email notifications for upcoming and overdue tasks.
