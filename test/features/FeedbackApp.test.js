let assert = require("assert");
let FeedbackApp = require("../../src/FeedbackApp.js");

describe("FeedbackApp", function () {
  let app = new FeedbackApp();

  describe("#formatFeedback", function () {
    it("should format the feedback to one line", function () {
      assert.equal(
        app.formatFeedback(swashbucklerFeedback),
        "swashbuckler: Yar, a good word, matey! Shiver me timbers! ★★★★ (9/19/2019)"
      );
    });

    describe("when formatted feedback would be over 80 characters", function () {
      it("removes the date", function () {
        assert.equal(
          app.formatFeedback(slubberFeedback),
          "slubber: Slubber sounds like slobber. So gross! More pretty words, please! ★½"
        );
      });
    });

    describe("when date is removed and when formatted feedback is still over 80 characters", function () {
      it("truncates the comment until the formatted feedback is 80 characters", function () {
        assert.equal(
          app.formatFeedback(textlationshipFeedback),
          "textlationship: I'm in a textlationship with my friend! We text all the t... ★★★"
        );
      });
    });

    describe("when the rating is omitted", function () {
      it("omits the rating", function () {
        assert.equal(
          app.formatFeedback(hyperbolicFeedback),
          "hyperbolic: How come teethpaste isn't in the dictionary? (8/22/2019)"
        );
      });
    });
  });

  describe("#truncateText", function () {
    it("truncates text correctly without stars", function () {
      assert.equal(
        app.truncateText(textlationshipFeedback.comment),
        "I'm in a textlationship with my friend! We text all the time! I feel like it'..."
      );
    });
    it("truncates text correctly with stars", function () {
      assert.equal(
        app.truncateText(textlationshipFeedback.comment, ' ★★'),
        "I'm in a textlationship with my friend! We text all the time! I feel like ... ★★"
      );
    });
  });

  describe("#formatStars", function () {
    it("gets correct number of stars", function () {
      assert.equal(
        app.formatStars(hyperbolicFeedback.rating),
        ""
      );
      assert.equal(
        app.formatStars(swashbucklerFeedback.rating),
        " ★★★★"
      );
    });
  });

  describe("#formatDate", function () {
    it("formates date correctly", function () {
      assert.equal(
        app.formatDate(hyperbolicFeedback.date),
        " (8/22/2019)"
      );
    });
  });
});

let swashbucklerFeedback = {
  word: "swashbuckler",
  comment: "Yar, a good word, matey! Shiver me timbers!",
  date: "19 Sep 2019 12:12:00 GMT",
  rating: 85
};

let slubberFeedback = {
  word: "slubber",
  comment: "Slubber sounds like slobber. So gross! More pretty words, please!",
  date: "10 Sep 2019 04:14:00 PST",
  rating: 31
};

let textlationshipFeedback = {
  word: "textlationship",
  comment:
    "I'm in a textlationship with my friend! We text all the time! I feel like it's every second! LMAO!",
  date: "24 Aug 2019 20:54:00 GMT",
  rating: 60
};

let hyperbolicFeedback = {
  word: "hyperbolic",
  comment: "How come teethpaste isn't in the dictionary?",
  date: "22 Aug 2019 01:20:00 PST"
};
