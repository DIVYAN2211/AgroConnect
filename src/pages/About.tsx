import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Harvest Wisdom</h1>
        
        {/* Mission Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            Harvest Wisdom is dedicated to empowering farmers and agricultural enthusiasts with knowledge, tools, and a supportive community. We believe that by sharing wisdom and resources, we can help build a more sustainable and prosperous agricultural future.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in the power of shared knowledge to transform agricultural practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Promoting environmentally friendly and sustainable farming practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building a strong, supportive community of farmers and agricultural experts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agricultural Experts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our team includes experienced farmers, agronomists, and agricultural scientists who bring decades of practical knowledge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technology Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We have a dedicated team of developers and designers creating innovative solutions for modern farming challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            Have questions or suggestions? We'd love to hear from you. Visit our contact page to reach out to our team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 