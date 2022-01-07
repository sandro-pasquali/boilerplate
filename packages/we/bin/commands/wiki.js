import wtf from 'wtf_wikipedia';

export default async query => {
    const page = await wtf.fetch(query);
    console.log(page.sentences()[0].text());
};
