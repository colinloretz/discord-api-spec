const id = "add-discord-tags";

function InjectOperationTags() {
  console.log("👾 discord: adding operation tags... ");
  return {
    Operation: {
      leave(target) {
        if (!target.tags) {
          target.tags = [];
        }

        // Prototype
        // We can make this more sophisticated later or have a mapping file.

        if (target.operationId.includes("guild")) {
          target.tags.push("Guild");
        }

        if (target.operationId.includes("auto_mod")) {
          target.tags.push("AutoMod");
        }

        if (target.operationId.includes("oauth2")) {
          target.tags.push("OAuth");
        }

        if (target.operationId.includes("user")) {
          target.tags.push("User");
        }

        if (target.operationId.includes("channel")) {
          target.tags.push("Channel");
        }

        if (target.operationId.includes("application")) {
          target.tags.push("Application");
        }

        if (target.operationId.includes("connection")) {
          target.tags.push("Connection");
        }

        if (target.operationId.includes("voice")) {
          target.tags.push("Voice");
        }

        if (target.operationId.includes("webhook")) {
          target.tags.push("Webhook");
        }

        if (target.operationId.includes("sticker")) {
          target.tags.push("Sticker");
        }

        if (target.operationId.includes("invite")) {
          target.tags.push("Invite");
        }

        if (target.operationId.includes("stage")) {
          target.tags.push("Stage");
        }

        if (target.operationId.includes("gateway")) {
          target.tags.push("Gateway");
        }

        if (target.operationId.includes("thread")) {
          target.tags.push("Thread");
        }

        if (target.operationId.includes("message")) {
          target.tags.push("Message");
        }

        if (target.operationId.includes("create_dm")) {
          target.tags.push("DM");
        }

        if (target.operationId.includes("interaction")) {
          target.tags.push("Interaction");
        }

        if (target.operationId.includes("indicator")) {
          target.tags.push("Indicators");
        }

        target.description = "Hello World! Change me in .yaml";
      },
    },
  };
}

function SetupTags() {
  console.log("👾 discord: setting up operation tags... ");
  return {
    Root(spec) {
      if (!spec.tags) {
        spec.tags = [];
      }

      // Prototype
      // We can make this more sophisticated later or have a mapping file.

      spec.tags.push({
        name: "Guild",
        description: "Guild description!",
      });

      spec.tags.push({
        name: "Interaction",
        description: "Interaction description!",
      });

      spec.tags.push({
        name: "Indicators",
        description: "Typing indicator description!",
      });

      spec.tags.push({
        name: "DM",
        description: "DM description!",
      });

      spec.tags.push({
        name: "OAuth",
        description: "Oauth description!",
      });

      spec.tags.push({
        name: "AutoMod",
        description: "AutoMod description!",
      });

      spec.tags.push({
        name: "Webhook",
        description: "Webhook description!",
      });

      spec.tags.push({
        name: "Sticker",
        description: "Sticker description!",
      });

      spec.tags.push({
        name: "Invite",
        description: "Invite description!",
      });

      spec.tags.push({
        name: "Stage",
        description: "Stage description!",
      });

      spec.tags.push({
        name: "Thread",
        description: "Thread description!",
      });

      spec.tags.push({
        name: "Message",
        description: "Message description!",
      });

      spec.tags.push({
        name: "Gateway",
        description: "Gateway description!",
      });

      spec.tags.push({
        name: "Connection",
        description: "Connection description!",
      });

      spec.tags.push({
        name: "User",
        description: "User description!",
      });

      spec.tags.push({
        name: "Channel",
        description: "Channel description!",
      });

      spec.tags.push({
        name: "Application",
        description: "Application description!",
      });

      spec.tags.push({
        name: "Voice",
        description: "Voice description!",
      });
    },
  };
}

module.exports = {
  id,
  preprocessors: {
    oas3: {
      "setup-tags": SetupTags,
    },
  },
  decorators: {
    oas3: {
      "add-tags": InjectOperationTags,
    },
  },
};
