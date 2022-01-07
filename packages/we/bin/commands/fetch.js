import got from 'got';
import cliHtml from 'cli-html';

export default async url => {
    const data = await got.get(url);

    console.log(cliHtml(data.body));
};
