const { IncomingWebhook } = require("@slack/webhook");

const webhook = new IncomingWebhook(secrets.SLACK_WEBHOOK);

(
  async () => {
    await webhook.send({
      text: "info by node.js",
      channel: "#_times_tmnakagawa"
    });
  }
)

();
