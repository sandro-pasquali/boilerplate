#!/usr/bin/env node

import { dirname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import glob from 'fast-glob';

// Forces any output to be colorized.
//
process.env.FORCE_COLOR = 1;

// This directory. What used to be returned from _dirname() pre-modules.
//
const directory = __dirname(import.meta.url);

// Gather available commands and Map by filename (filename == command name)
//
const Commands = new Map();
const commands = await glob(join(directory, `commands/**/*.js`), {
    onlyFiles: true
});

for(const commandPath of commands) {
    const commandName = basename(commandPath, '.js');
    const { default: command } = await import(commandPath);
    Commands.set(commandName, command);
}

// comment
Yargs(hideBin(process.argv))
    .command(
        'fetch [url]',
        'Display the contents of a url',
        yargs => {
            yargs.positional('url', {
                describe: 'The url to fetch'
            });
            yargs.demandOption(['url']);
            return yargs;
        },
        async argv => {
            await Commands.get('fetch')(argv.url);
        }
    )
    .command(
        'commit [message]',
        'Commit git changes',
        yargs => {
            yargs.positional('message', {
                describe: 'The commit message'
            });
            yargs.demandOption(['message']);
            return yargs;
        },
        async argv => {
            await Commands.get('commit')(argv.message);
        }
    )
    .command(
        'wiki [query]',
        'Ask Wikipedia for information',
        yargs => {
            yargs.positional('query', {
                describe: `A query to ask Wikipedia about. Try 'CN Tower'`
            });
            yargs.demandOption(['query']);
            return yargs;
        },
        async argv => {
            await Commands.get('wiki')(argv.query);
        }
    )
    .parse();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

function __filename(importMetaUrl) {
    return fileURLToPath(importMetaUrl);
}

function __dirname(importMetaUrl) {
    return dirname(__filename(importMetaUrl));
}
