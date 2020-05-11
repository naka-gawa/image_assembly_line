import * as core from '@actions/core';
import Docker from './docker';

async function run(): Promise<void> {
  try {
    // REGISTRY_NAME はユーザー側から渡せない様にする
    const registry: string | undefined = process.env.REGISTRY_NAME
    if (!registry) {
      throw new Error('REGISTRY_NAME is not set.')
    }
    core.debug(registry)
    if (process.env.GITHUB_TOKEN) {
      core.setSecret(process.env.GITHUB_TOKEN)
    }

    const { IncomingWebhook } = require('@slack/webhook');
    const url = process.env.SLACK_WEBHOOK_URL;
    const webhook = new IncomingWebhook(url);
    // Send the notification
    await webhook.send({
      text: 'I\'ve got news for you...',
    });
  } catch (error) {
    core.error(error.toString())
    core.setFailed(error.message)
  }
}

run()
