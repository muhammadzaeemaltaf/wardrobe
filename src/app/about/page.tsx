import Image from "next/image";
import DownloadBanner from "@/components/Download";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="px-4 py-12 md:py-10">
          <div className="container mx-auto">
            <div className="grid gap-6 lg:grid-cols-[60%_40%]">
              <div className="flex items-center">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    We&apos;re changing the way people connect
                  </h1>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400">
                    Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in
                    quis cupidatat mollit aute velit. Et labore commodo nulla
                    aliqua proident mollit ullamco exercitation tempor. Sint
                    aliqua anim nulla sunt mollit id pariatur in voluptate
                    cillum. Eu voluptate tempor esse minim amet fugiat veniam
                    occaecat aliqua.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 items-center grid-cols-3">
                <div className="h-[40%]">
                  <Image
                    alt="Workspace"
                    className="rounded-lg h-full aspect-[2/3] object-cover"
                    height={1000}
                    src="/images/5.avif"
                    width={1000}
                  />
                </div>
                <div className="h-full flex items-center">
                  <div className="grid gap-4 grid-rows-2 h-[80%]">
                    <Image
                      alt="Meeting"
                      className="rounded-lg h-full object-cover aspect-[2/3]"
                      height={1000}
                      src="/images/4.avif"
                      width={1000}
                    />
                    <Image
                      alt="Office"
                      className="rounded-lg h-full object-cover aspect-[2/3]"
                      height={1000}
                      src="/images/3.avif"
                      width={1000}
                    />
                  </div>
                </div>
                <div className="h-full ">
                  <div className="grid grid-rows-2 gap-4 h-[80%]">
                    <Image
                      alt="Meeting"
                      className="rounded-lg h-full object-cover aspect-[2/3]"
                      height={1000}
                      src="/images/2.avif"
                      width={1000}
                    />
                    <Image
                      alt="Office"
                      className="rounded-lg h-full object-cover aspect-[2/3]"
                      height={1000}
                      src="/images/1.avif"
                      width={1000}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-gray-50 px-4 py-12 dark:bg-gray-800">
          <div className="container mx-auto">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Our mission
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
                  sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
                  id at vitae feugiat egestas ac. Diam nulla orci at in viverra
                  scelerisque eget. Eleifend egestas fringilla sapien.
                </p>
              </div>
              <div className="grid gap-4 justify-center grid-rows-3">
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-5xl font-bold">44 million</h3>
                  <p className="text-sm text-gray-500 sm:text-lg dark:text-gray-400">
                    Active users
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-5xl font-bold">$119 trillion</h3>
                  <p className="text-sm text-gray-500 sm:text-lg dark:text-gray-400">
                    Total volume
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-5xl font-bold">46,000</h3>
                  <p className="text-sm text-gray-500 sm:text-lg dark:text-gray-400">
                    Partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Image */}
        <section className="relative w-full py-10 overflow-hidden">
          <div className="w-[90%] mx-auto">
            <Image
              alt="People together"
              className="object-cover h-[400px] rounded-xl w-full"
              height={1000}
              width={1000}
              src="/images/photo.avif"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 py-12 md:py-24">
          <div className="container mx-auto">
            <h2 className="mb-8 text-3xl font-bold tracking-tighter">
              Our values
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Be world-class</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We strive for excellence in everything we do, setting new
                  standards in our industry.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Think responsibly</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We consider the impact of our decisions on our community and
                  the environment.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Stay innovative</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We continuously explore new ideas and technologies to improve
                  our services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Companies Section */}
      <section className="border-t bg-white px-4 py-6 dark:bg-gray-950">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center gap-8">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Trusted by the world&apos;s best companies
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <span className="text-xl md:text-3xl font-semibold">Transistor</span>
              <span className="text-xl md:text-3xl font-semibold">Form</span>
              <span className="text-xl md:text-3xl font-semibold">Triple</span>
              <span className="text-xl md:text-3xl font-semibold">ServiceX</span>
              <span className="text-xl md:text-3xl font-semibold">Statamic</span>
            </div>
          </div>
        </div>
      </section>
      <DownloadBanner/>
    </div>
  );
}
