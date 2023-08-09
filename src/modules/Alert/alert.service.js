const { Telegraf } = require("telegraf");
const { addTelegramSubscriber, getTelegramSubscribers } = require("./model");
const users = new Set();

const AlertService = async () => {
  const startup = async () => {
    const botToken = "6657746463:AAERZ8r_ymSXfxCm_UGRkJVjzPUd_IZ_EOQ";

    const bot = new Telegraf(botToken);

    console.log(bot, botToken);

    bot.start(async (ctx) => {
      const conversationId = ctx.message.from.id;
      addTelegramSubscriber(conversationId);
      ctx.reply("Welcome!");
    });

    bot.launch();

    return bot;
  };

  let bot = await startup();

  const sendMessage = async (message) => {
    const subs = await getTelegramSubscribers();
    subs.forEach((sub) => {
      bot.telegram.sendMessage(sub.conversationId, message);
    });
  };

  const main = (msg) => {
    // save alert doc
    // send alert message to bot
  };

  const alertKeeperFailed = (payload) => {};

  const alertLowSystemCoinBalance = (payload) => {};

  const alertBid = (payload) => {};

  const alertSettlement = (payload) => {};

  const alertLiquidation = (payload) => {};

  const alertLowNativeCoinBalance = (payload) => {};

  return {
    main,
    sendMessage,
    startup,
    alertKeeperFailed,
    alertLowSystemCoinBalance,
    alertBid,
    alertSettlement,
    alertLiquidation,
    alertLowNativeCoinBalance,
  };
};

module.exports = AlertService;
