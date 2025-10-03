import User from "../models/user.model.js";

/**
 * Follow a user
 * @route POST /api/follow/:userId
 */
export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;

    // Can't follow yourself
    if (userId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Find both users
    const [userToFollow, currentUser] = await Promise.all([
      User.findById(userId),
      User.findById(currentUserId)
    ]);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following
    const isAlreadyFollowing = currentUser.following.some(
      id => id.toString() === userId
    );

    if (isAlreadyFollowing) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Add to following/followers lists
    currentUser.following.push(userId);
    userToFollow.followers.push(currentUserId);

    // Save both users
    await Promise.all([
      currentUser.save(),
      userToFollow.save()
    ]);

    return res.status(200).json({ 
      message: "User followed successfully",
      following: currentUser.following,
      followersCount: userToFollow.followers.length
    });
  } catch (error) {
    return res.status(500).json({ message: `Follow error: ${error.message}` });
  }
};

/**
 * Unfollow a user
 * @route POST /api/follow/unfollow/:userId
 */
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;

    // Can't unfollow yourself
    if (userId === currentUserId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    // Find both users
    const [userToUnfollow, currentUser] = await Promise.all([
      User.findById(userId),
      User.findById(currentUserId)
    ]);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if actually following
    const isFollowing = currentUser.following.some(
      id => id.toString() === userId
    );

    if (!isFollowing) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    // Remove from following/followers lists
    currentUser.following = currentUser.following.filter(
      id => id.toString() !== userId
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => id.toString() !== currentUserId
    );

    // Save both users
    await Promise.all([
      currentUser.save(),
      userToUnfollow.save()
    ]);

    return res.status(200).json({ 
      message: "User unfollowed successfully",
      following: currentUser.following,
      followersCount: userToUnfollow.followers.length
    });
  } catch (error) {
    return res.status(500).json({ message: `Unfollow error: ${error.message}` });
  }
};

/**
 * Get follow status for a user
 * @route GET /api/follow/status/:userId
 */
export const getFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;

    const currentUser = await User.findById(currentUserId);

    const isFollowing = currentUser.following.some(
      id => id.toString() === userId
    );

    return res.status(200).json({ isFollowing });
  } catch (error) {
    return res.status(500).json({ message: `Get follow status error: ${error.message}` });
  }
};