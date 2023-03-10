import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Poll from '../models/pollModel.js';

const getAllPolls = async (req, res) => {  
    try {
    const polls = await Poll.find({});
    res.status(200).render('polls', {
      polls,
      link: 'polls',
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      error,
    });
  }
  };

  const getAPoll = async (req, res) => {
    try {
      const pollname = req.params.pollname;
      const poll = await Poll.findOne({ pollname: pollname });
      const { _id, pollquestion, options } = poll;
  
      req.session.returnTo = `/polls/${pollname}`

      const results = options.map(option => ({
        title: option.title,
        picture: option.picture,
        votes: option.voters.length,
      })).sort((a, b) => b.votes - a.votes);
  
      res.render('poll', { poll, pollname, options, pollquestion, _id, results, link: 'poll' });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while retrieving poll results');
    }
  };

  const pollVoting = async (req, res) => {
    try {
      const user = await User.findById(res.locals.user._id);
      if (user.followingPolls.includes(req.params.pollname)) {
        return res.status(400).send({ message: 'Bu anketde daha önce oy kullandınız' });
      }
  
      const poll = await Poll.findOneAndUpdate(
        { pollname: req.params.pollname, 'options.title': req.body.optiontitle },
        { $addToSet: { 'options.$.voters': { userId: res.locals.user._id } } },
        { new: true }
      );
  
      if (!poll) {
        return res.status(404).send({ message: 'Poll not found' });
      }
  
      await User.findByIdAndUpdate(
        res.locals.user._id,
        { $push: { followingPolls: req.params.pollname } }
      );
  
      return res.send({ message: 'Başarıyla oy kullandınız', poll });
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };
  
  
  
  


  export {
    getAllPolls,
    getAPoll,
    pollVoting
  }; 