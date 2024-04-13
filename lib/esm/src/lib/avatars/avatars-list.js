export const getAvatarsList = (nexaiAssetsUrl = '') => [
    {
        name: 'Observer',
        path: 'alien-1-eye.png'
    },
    {
        name: 'Visionary',
        path: 'alien-3-eyes.png'
    },
    { name: 'Freedom Seeker', path: 'eagle.png' },
    { name: 'Mysterious One', path: 'ghost.png' },
    {
        name: 'Dualist',
        path: 'ninja-2-swords.png'
    },
    {
        name: 'Stealth Warrior',
        path: 'ninja-girl.png'
    },
    {
        name: 'Silent Guardian',
        path: 'ninja-white.png'
    },
    { name: 'Wise Sage', path: 'owl.png' },
    { name: 'Festive Spirit', path: 'pumpkin.png' },
    {
        name: 'Enchanter',
        path: 'sourceress.png'
    },
    { name: 'Dreamer', path: 'unicorn.png' },
    { name: 'Arcane Scholar', path: 'wizard.png' }
].map(avatar => ({
    name: avatar.name,
    path: `${nexaiAssetsUrl}/avatars/${avatar.path}`
}));
