import * as core from '@actions/core';
import { Slack, Success, Failure, Cancelled, Custom } from './slack';
import { IncomingWebhookSendArguments } from '@slack/webhook';

async function run(): Promise<void> {
  try {
    const status = core.getInput('status', { required: true }).toLowerCase();
    const mention = core.getInput('mention');
    const author_name = core.getInput('author_name');
    const if_mention = core.getInput('if_mention').toLowerCase();
    const text = core.getInput('text');
    const username = core.getInput('username');
    const icon_emoji = core.getInput('icon_emoji');
    const icon_url = core.getInput('icon_url');
    const channel = core.getInput('channel');
    const custom_payload = core.getInput('custom_payload');
    const payload = core.getInput('payload');
    const fields = core.getInput('fields');

    core.debug(`status: ${status}`);
    core.debug(`mention: ${mention}`);
    core.debug(`author_name: ${author_name}`);
    core.debug(`if_mention: ${if_mention}`);
    core.debug(`text: ${text}`);
    core.debug(`username: ${username}`);
    core.debug(`icon_emoji: ${icon_emoji}`);
    core.debug(`icon_url: ${icon_url}`);
    core.debug(`channel: ${channel}`);
    core.debug(`custom_payload: ${custom_payload}`);
    core.debug(`payload: ${payload}`);
    core.debug(`fields: ${fields}`);

    const slack = new Slack(
      {
        status,
        mention,
        author_name,
        if_mention,
        username,
        icon_emoji,
        icon_url,
        channel,
        fields,
      },
      process.env.SLACK_WEBHOOK_URL,
    );

    await slack.send(await slack.success(text));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
