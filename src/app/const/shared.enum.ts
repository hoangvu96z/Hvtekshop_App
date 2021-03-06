/* eslint-disable eol-last */
export const MAIN_URL = 'http://hvtekshop.com/wp/wp-json/wc/v2';
export type PredefinedColors =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'light'
    | 'medium'
    | 'dark';

export const LANGUAGES = [{
    display: 'English',
    key: 'en_US'
},
{
    display: 'Tiếng Việt',
    key: 'vi'
}];
export const ROLES = [
    {
        display: 'Subscriber',
        key: 'subscriber',
    },
    {
        display: 'Administrator',
        key: 'administrator'
    },
    {
        display: 'Author',
        key: 'author',
    },
    {
        display: 'Contributor ',
        key: 'contributor'
    },
    {
        display: 'Editor',
        key: 'editor'
    },
];