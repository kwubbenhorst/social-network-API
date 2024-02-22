const mongoose = require('mongoose');

const usernames = [
    'DrPhil', 'KingCharles', 'GenghisKhan', 'JeanLucPicard', 'MrSnuffaluphagus', 'MisterRogers',
    'SherlockHolmes', 'AlbusDumbledore', 'HannibalLecter', 'DocOck', 'JamesBond', 'MissMoneypenny',
    'FriendlyGiant', 'BarenakedLady', 'PeppermintPatty', 'BarneyRubble', 'SnidleyWhiplash', 'FrodoBaggins',
    'AnonymousWombat', 'DiscreteDiva', 'HappyWanderer', 'JuliaChild', 'LittleMermaid', 'VillainousKitten'
  ];
  
const thoughts = [
    "Here's all you have to know about men and women: women are crazy, men are stupid. And the main reason women are crazy is that men are stupid.",
    "Men are from Earth, women are from Earth. Deal with it.",
    "Some people see things that are and ask, 'Why?' Some people dream of things that never were and ask, 'Why not?' Some people have to go to work and don't have time for all that.",
    "Most people work just hard enough not to get fired and get paid just enough money not to quit.",
    "A house is just a place to keep your stuff while you go out and get more stuff.",
    "The caterpillar does all the work, but the butterfly gets all the publicity.",
    "Never argue with an idiot. They will only bring you down to their level and beat you with experience.",
    "Ever wonder about those people who spend $2 apiece on those little bottles of Evian water? Try spelling Evian backward.",
    "Never underestimate the power of stupid people in large groups.",
    "Don’t just teach your children to read. Teach them to question what they read. Teach them to question everything.",
    "We have multiplied our possessions but reduced our values. We talk too much, love too seldom, and hate too often. We’ve learned how to make a living but not a life. We’ve added years to life, not life to years.",
    "Trying to be happy by accumulating possessions is like trying to satisfy hunger by taping sandwiches all over your body.",
    "We are a nation of sheep, and someone else owns the grass.",
    "Fighting for peace is like screwing for virginity.",
    "Well, if crime fighters fight crime and firefighters fight fires, what do freedom fighters fight?",
    "War is rich old men protecting their property by sending middle class and lower class men off to die.",
    "I have lots of ideas. Trouble is, most of them suck.",
    "Scratch any cynic and you will find a disappointed idealist.",
    "I think people should be allowed to do what they want. We haven’t tried that for a while. Maybe this time it’ll work.",
    "If you have selfish, ignorant citizens, you’re going to have selfish, ignorant leaders.",
    "Some national parks have long waiting lists for camping reservations. When you have to wait a year to sleep next to a tree, something is wrong.",
    "By and large, language is a tool for concealing the truth.",
    "I like it when a flower or a little tuft of grass grows through a crack in the concrete. It's so heroic.",
    "'I am' is reportedly the shortest sentence in the English language. Could it be that 'I do' is the longest sentence?",
    "Most people with low self-esteem have earned it.",
    "People are wonderful one at a time. Each one of them has an entire hologram of the universe somewhere within them.",
    "I love and treasure individuals as I meet them, I loath and despise the groups they identify or belong to.",
    "If it’s true that our species is alone in the universe, then I’d have to say the universe aimed rather low and settled for very little.",
    "I think the warning labels on alcoholic beverages are too bland. They should be more vivid. Here is one I would suggest: 'Alcohol will turn you into the same a**hole your father was.'",
    "There are women named Faith, Hope, Joy, and Prudence. Why not Despair, Guilt, Rage, and Grief? It seems only right. 'Tom, I'd like you to meet the girl of my dreams, Tragedy.' These days, ‘Trajedi.’",
    "I bet you anything that 10 times out of 10, Nicky, Vinny and Tony will be able to beat up Todd, Kyle and Tucker.",
    "Isn’t making a smoking section in a restaurant like making a peeing section in a swimming pool?",
    "If you try to fail, and succeed, which have you done?",
    "The reason I talk to myself is because I’m the only one whose answers I accept.",
    "Isn’t it a bit unnerving that doctors call what they do ‘practice'?",
    "I was a loner as a child. I had an imaginary friend. I didn't bother with him.",
    "I went to a bookstore and asked the saleswoman, 'Where's the self-help section?' She said if she told me, it would defeat the purpose.",
    "Some people see the glass half full. Others see it half empty. I see a glass that's twice as big as it needs to be.",
    "Have you ever noticed that anybody driving slower than you is an idiot, and anyone going faster than you is a maniac?",
    "There are nights when the wolves are silent and only the moon howls.",
    "When I ask how old your toddler is, I don't need to hear '27 months.' 'He's two' will do just fine. He's not a cheese. And I didn't really care in the first place.",
    "I thought about how mothers feed their babies with tiny little spoons and forks so I wondered, what do Chinese mothers use? Toothpicks?",
    "If four out of five people suffer from diarrhea … does that mean that one enjoys it?",
    "Just ‘cause you got the monkey off your back doesn’t mean that the circus has left town.",
    "Honesty may be the best policy, but it's important to remember that apparently, by elimination, dishonesty is the second-best policy.",
    "The main reason Santa is so jolly is because he knows where all the bad girls live.",
    "People always tell me 'Have a nice day.' Well what if I don't want to? What if I want to have a crappy day?",
    "If the black box flight recorder is never damaged during a plane crash, why isn’t the whole airplane made out of that stuff?",
    "It's never just a game when you're winning.",
    "'Meow' means 'woof' in cat.",
    "I think I am, therefore, I am ... I think.",
    "Would a fly without wings be called a walk?",
    "There's no present. There's only the immediate future and the recent past.",
    "Electricity is really just organized lightning.",
    "People who say they don't care what people think are usually desperate to have people think they don't care what people think.",
    "If you can't beat them, arrange to have them beaten.",
    "One can never know for sure what a deserted area can look like.",
    "When you step on the brakes, your life is in your foot’s hands.",
    "I often warn people: ‘Somewhere along the way, someone is going to tell you, ‘There is no ‘I’ in team.’ What you should tell them is, ‘Maybe not. But there is an ‘I’ in independence, individuality, and integrity.",
    "Those who dance are considered insane by those who cannot hear the music.",
    "There's a humorous side to every situation. The challenge is to find it.",
    "My advice: just keep moving straight ahead. Every now and then you find yourself in a different place.",
    "Everyone smiles in the same language.",
    "A good motto to live by: 'Always try not to get killed.'",
    "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    "'One thing leads to another'? Not always. Sometimes one thing leads to the same thing. Ask an addict."
  ];
  
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random username and email
  const getRandomUsername = (username) => {
    const emailMap = {
      'DrPhil': 'drphil@thedrphilshow.com',
  'KingCharles': 'kingcharles@clarencehouse.co.uk',
  'GenghisKhan': 'genghiskhan@mongolia.mn',
  'JeanLucPicard': 'jeanlucpicard@enterprise.com',
  'MrSnuffaluphagus': 'mrsnuffaluphagus@sesamestreet.com',
  'MisterRogers': 'misterrogers@theneighbourhood.com',
  'SherlockHolmes': 'sherlockholmes@221b.co.uk',
  'AlbusDumbledore': 'albusdumbledore@hogwarts.edu',
  'HannibalLecter': 'hanniballecter@uffizilibrary.it',
  'DocOck': 'docock@newyorkcity.com',
  'JamesBond': 'jamesbond@MI6.co.uk',
  'MissMoneypenny': 'missmoneypenny@vauxhallcross.co.uk',
  'FriendlyGiant': 'friendlygiant@cbcyesteryear.ca',
  'BarenakedLady': 'barenakedlady@bigbang.com',
  'PeppermintPatty': 'peppermintpatty@schultzville.com',
  'BarneyRubble': 'barneyrubble@flintstonia.com',
  'SnidleyWhiplash': 'snidleywhiplash@dorightville.com',
  'FrodoBaggins': 'frodobaggins@theshire.co.uk',
  'AnonymousWombat': 'anonymouswombat@googledrive.com',
  'DiscreteDiva': 'discretediva@shhh.com',
  'HappyWanderer': 'happywanderer@wanderlust.com',
  'JuliaChild': 'juliachild@artoffrenchcooking.com',
  'LittleMermaid': 'littlemermaid@kelpforest.com',
  'VillainousKitten': 'villainouskitten@hairball.com'
    };
    return {
      username,
      email: emailMap[username],
    };
   };


  // Generate random thoughts
  const getRandomThoughts = (int, username) => {
    const results = [];
    const usedIndexes = new Set(); // Keep track of used indexes
    let attempts = 0; // To prevent infinite loop in case int is larger than thoughts.length
    while (results.length < int && attempts < thoughts.length * 2) {
        const index = Math.floor(Math.random() * thoughts.length);
        if (!usedIndexes.has(index)) {
            const thoughtText = thoughts[index];
            const newThought = {
                _id: new mongoose.Types.ObjectId(),
                thoughtText: thoughtText,
                username
            };
            usedIndexes.add(index);
            results.push(newThought);
        }
        attempts++;
    }
    return results;
};  
  
// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughts };
  
  