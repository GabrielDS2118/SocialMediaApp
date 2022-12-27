import User from '../models/User.js';

/*READ*/

const listFriends = async (userId) => {
  const user = await User.findById(userId);

  const friends = await Promise.all(
    user.friends.map((userId) => User.findById(userId))
  );

  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );

  return formattedFriends;
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const friends = listFriends(id);

    res.status(200).json(friends);
  } catch (err) {
    res.send(404).json({ message: err.message });
  }
};

/*UPDATE*/
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = listFriends(id);
    res.status(200).json(friends);
  } catch (err) {
    res.send(404).json({ message: err.message });
  }
};
