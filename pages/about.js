import Layout from '../components/layout';

export default function About() {
  return (
    <Layout>
      <div className="container-fluid p-0">
        <section className="resume-section p-3 p-lg-5 d-flex align-items-center">
          <div className="w-100">
            <h3>About me</h3>
            <p className="lead mb-5">
              I am into software development since 10+ years. I am a Ruby on Rails developer from Pune, India.
              I mostly work on Rails and Go and currently learning React and React Native.
              <br/>
              <br/>
              I am working as a Ruby on Rails consultant at <a href="https://www.saeloun.com/" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">Saeloun Technologies Pvt. Ltd.</a>
              <br/>
              <br/>

              I try to contribute to the open-source community. I have contributed to
              <ul className="list-disc list-inside">
                <li>
                  <a href="https://contributors.rubyonrails.org/contributors/alkesh-ghorpade/commits" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">Rails</a>
                </li>
                <li>
                  <a href="https://go-review.googlesource.com/q/alkesh26" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">Go</a>
                </li>
                <li>
                  <a href="https://github.com/aws/aws-sdk-ruby/pulls?q=is%3Apr+author%3Aalkesh26+is%3Aclosed" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">aws-sdk-ruby</a>
                </li>
              </ul>
              <br/>
              I love to solve Programming Challenges. I am active on <a href="https://leetcode.com/alkesh/" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">LeetCode </a>
              and other platforms
              <ul className="list-disc list-inside">
                <li>
                  <a href="https://www.hackerearth.com/@alkesh26" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">Hackerearth</a>
                </li>
                <li>
                  <a href="https://www.interviewbit.com/profile/alkesh_ghorpade" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">Interviewbit</a>
                </li>
                <li>
                  <a href="https://www.hackerrank.com/alkesh26" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">Hackerrank</a>
                </li>
              </ul>
              <br/>

              I love working with startups and have strong problem solving skills. Optimizing
              code is always my first focus.

              <br/>
              <br/>
              When I&apos;m not coding, you&apos;ll find me <a href="https://www.goodreads.com/user/show/38642969-alkesh-ghorpade" target="_blank" rel="nofollow noopener noreferrer" className="text-yellow-500">reading books</a>, playing football or guitar.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
