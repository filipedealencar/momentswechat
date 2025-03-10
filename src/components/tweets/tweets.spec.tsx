import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {Tweets} from '.';

describe('Tweets Component', () => {
  const mockTweet = {
    sender: {
      username: 'John Doe',
      nick: 'User1',
      avatar: 'https://fakeurl.com/avatar.jpg',
    },
    content: 'Tweet de Teste',
    images: [{url: 'https://fakeurl.com/image1.jpg'}],
  };

  it('deve renderizar corretamente o nome do usuário e o conteúdo do tweet', () => {
    render(<Tweets tweet={mockTweet} />);

    expect(screen.getByText('User1')).toBeTruthy();
    expect(screen.getByText('Tweet de Teste')).toBeTruthy();
  });

  it('deve renderizar a imagem do avatar corretamente', () => {
    render(<Tweets tweet={mockTweet} />);

    const avatar = screen.getByLabelText('Avatar de User1');
    expect(avatar).toBeTruthy();
  });

  it('deve renderizar corretamente a grade de imagens se houver imagens', () => {
    render(<Tweets tweet={mockTweet} />);

    const imageGrid = screen.getByTestId('grid-image');
    expect(imageGrid).toBeTruthy();
  });

  it('não deve renderizar a grade de imagens se não houver imagens', () => {
    const tweetSemImagem = {...mockTweet, images: []};
    render(<Tweets tweet={tweetSemImagem} />);

    expect(screen.queryByTestId('grid-image')).toBeNull();
  });
});
