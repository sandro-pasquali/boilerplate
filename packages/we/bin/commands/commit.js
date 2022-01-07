import shell from 'shelljs';

export default (message = 'no commit message') => {
    if(shell.exec(`git add . && git commit -m "${message}"`).code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }
};
