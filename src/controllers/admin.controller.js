import { Project } from "../models/Project.model.js";
import { BlogPost } from "../models/BlogPost.model.js";
import { ContactMessage } from "../models/ContactMessage.model.js";
import { Skill } from "../models/Skill.model.js";
import { SiteSettings } from "../models/SiteSettings.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    totalBlogs,
    publishedBlogs,
    totalSkills,
    unreadMessages,
    settings,
    recentMessages,
    recentProjects,
    recentBlogs,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ isVisible: true }),
    Project.countDocuments({ isVisible: false }),
    BlogPost.countDocuments(),
    BlogPost.countDocuments({ status: "published" }),
    Skill.countDocuments(),
    ContactMessage.countDocuments({ status: "unread" }),
    SiteSettings.findOne(),
    ContactMessage.find().sort({ createdAt: -1 }).limit(5).select("name email subject status createdAt"),
    Project.find().sort({ updatedAt: -1 }).limit(5).select("title category status isVisible updatedAt"),
    BlogPost.find().sort({ updatedAt: -1 }).limit(5).select("title status category publishedAt updatedAt"),
  ]);

  const statsData = {
    stats: {
      totalProjects,
      publishedProjects,
      draftProjects,
      totalBlogs,
      publishedBlogs,
      totalSkills,
      unreadMessages,
      availableForWork: settings ? settings.availableForWork : false,
      availabilityNote: settings ? settings.availabilityNote : "",
    },
    recentMessages,
    recentProjects,
    recentBlogs,
  };

  res.status(200).json(new ApiResponse(200, statsData, "Dashboard statistics retrieved successfully"));
});
