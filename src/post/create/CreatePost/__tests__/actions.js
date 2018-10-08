import { getAllTags } from '../actions';

describe('Tags for posts', () => {
  it('should process tags properly', () => {
    const allCommunities = [
      {
        id: 0,
        tag: 'hapramp-art',
      },
      {
        id: 1,
        tag: 'hapramp-dance',
      },
      {
        id: 2,
        tag: 'hapramp-photography',
      },
    ];

    const hashtags = ['alpha', 'beta', 'gamma'];

    const communities = [0, 2];

    const allTags = getAllTags(communities, hashtags, allCommunities);

    expect(allTags.sort()).toEqual([
      'hapramp-art',
      'hapramp',
      'hapramp-photography',
      'alpha',
      'beta',
      'gamma',
      'art',
      'photography',
    ].sort());
  });
});
