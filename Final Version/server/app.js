const express = require("express");
require("express-async-errors");
const cors = require("cors");
const middleware = require("./utils/middleware");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const subredditRoutes = require("./routes/subreddit");
const userRoutes = require("./routes/user");
const notification = require("./routes/notificationRoutes");
const feedback = require("./routes/FeedBackRoutes");
const tagRoutes = require("./routes/tag");
const articleRouter = require("./routes/articleRouter");
const reportRouter = require('./routes/report');

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use('/api/report', reportRouter);

app.use("/api", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subreddits", subredditRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notification", notification);
app.use("/api/feedback", feedback);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", articleRouter);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

app.use((req, res) => {
    res.status(404).json({ message: 'Unknown endpoint.' });
});




module.exports = app;
