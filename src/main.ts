import * as core from '@actions/core';
import Docker from './docker';
import { Slack } from './slack';

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
      process.env.GITHUB_TOKEN,
      process.env.SLACK_WEBHOOK_URL,
    );
    core.debug('before');
    //await slack.send(await slack.success(text));
  } catch (error) {
    core.error(error.toString())
    core.setFailed(error.message)
  }
}

run()
