await User.findByIdAndUpdate(
    res.locals.user._id,
    { $push: { followingCandidate: candidate.username } }
  );


  user.followingCandidate.push(candidate.username);
    await user.save();