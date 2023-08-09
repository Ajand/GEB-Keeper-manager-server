const mongoose = require("mongoose");

const TelegramSubscribersSchema = mongoose.Schema({
  conversationId: { type: "string", required: true },
});

const TelegramSubscribers = mongoose.model(
  "telegramSub",
  TelegramSubscribersSchema
);

const getTelegramSubscribers = () => {
  return new Promise(async (resolve, reject) => {
    TelegramSubscribers.find({})
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const addTelegramSubscriber = (conversationId) => {
  return new Promise(async (resolve, reject) => {
    const subscriber = await TelegramSubscribers.findOne({
      conversationId,
    });
    if (subscriber) {
      return resolve(subscriber);
    } else {
      const ts = new TelegramSubscribers({ conversationId });
      return resolve(ts.save());
    }
  });
};

module.exports = {
  getTelegramSubscribers,
  addTelegramSubscriber,
};
