import app from './server';

const appps = new app()

appps.app.listen(4000, () => {
    console.log('server on port');
})