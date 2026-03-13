"use client";
import { useSiteStore } from "@/lib/store";
import { Card, CardHeader } from "@/components/ui/Card";
import { FormField, Input, Textarea, Select } from "@/components/ui/FormField";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { BlogCategory } from "@/types";

export default function BlogPage() {
  const blogPosts = useSiteStore((s) => s.data.blogPosts);
  const updateBlogPost = useSiteStore((s) => s.updateBlogPost);

  return (
    <div>
      <Card>
        <CardHeader
          title="📰 Blog Posts"
          badge={{ text: "6 Posts", variant: "green" }}
        />
        <p className="text-[0.84rem] text-[#666] mb-5 leading-relaxed">
          Edit all 6 blog posts shown in the{" "}
          <strong>"Property insights"</strong> section. Upload images, change
          titles, categories and excerpts.
        </p>

        <div className="flex flex-col gap-6">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[#F5921E]">
                <h3 className="font-montserrat text-[0.82rem] font-extrabold uppercase tracking-wide">
                  Post {idx + 1}
                </h3>
                <span className="text-[0.64rem] font-montserrat font-bold text-[#666] truncate max-w-[300px]">
                  {post.title}
                </span>
              </div>

              <div className="p-5">
                {/* Image upload */}
                <ImageUpload
                  value={post.img}
                  onChange={(url) => updateBlogPost(idx, { img: url })}
                  label="Upload post image"
                  height="120px"
                />

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <FormField label="Category">
                    <Select
                      value={post.category}
                      onChange={(e) =>
                        updateBlogPost(idx, { category: e.target.value as BlogCategory })
                      }
                    >
                      <option value="market">Market News</option>
                      <option value="update">Project Update</option>
                      <option value="tips">Buying Tips</option>
                    </Select>
                  </FormField>
                  <FormField label="Status Badge">
                    <Input
                      value={post.statusBadge}
                      onChange={(e) => updateBlogPost(idx, { statusBadge: e.target.value })}
                      placeholder="e.g. Trending"
                    />
                  </FormField>
                  <FormField label="Location">
                    <Input
                      value={post.location}
                      onChange={(e) => updateBlogPost(idx, { location: e.target.value })}
                      placeholder="e.g. Konza, Machakos County"
                    />
                  </FormField>
                  <FormField label="Title" fullWidth>
                    <Input
                      value={post.title}
                      onChange={(e) => updateBlogPost(idx, { title: e.target.value })}
                      placeholder="Blog post title..."
                    />
                  </FormField>
                  <FormField label="Excerpt" fullWidth>
                    <Textarea
                      value={post.excerpt}
                      onChange={(e) => updateBlogPost(idx, { excerpt: e.target.value })}
                      style={{ minHeight: "80px" }}
                      placeholder="Short excerpt shown on the blog card..."
                    />
                  </FormField>
                  <FormField label="Date">
                    <Input
                      value={post.date}
                      onChange={(e) => updateBlogPost(idx, { date: e.target.value })}
                      placeholder="e.g. March 2025"
                    />
                  </FormField>
                  <FormField label="Read Time">
                    <Input
                      value={post.readTime}
                      onChange={(e) => updateBlogPost(idx, { readTime: e.target.value })}
                      placeholder="e.g. 4 min read"
                    />
                  </FormField>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
