// Tipo para a imagem do tweet
export interface TweetImage {
  url: string;
}

// Tipo do remetente (usuário que postou ou comentou)
export interface UserTweets {
  username: string;
  nick: string;
  avatar: string;
}

// Tipo de comentário dentro de um tweet
export interface TweetComment {
  content: string;
  sender: UserTweets;
}

// Tipo principal do Tweet
export interface Tweet {
  content?: string; // Pode estar ausente
  images?: TweetImage[]; // Pode estar ausente
  sender: UserTweets;
  comments?: TweetComment[]; // Pode estar ausente
  error?: string; // Alguns objetos contêm um campo "error"
}
