import {
  facebook,
  gmail,
  tel,
  support,
  instagram,
} from "@/src/utils/constants";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";
import LocalizedText from "@/src/components/LocalizedText";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white p-10 border-t border-gray-900">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* 1. Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/akula-logo.webp"
                alt="Akula Topping Logo"
                width={120}
                height={50}
                className=" object-contain w-auto h-auto"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              <LocalizedText
                id="footer_brand_desc"
                fallback="Crafting premium natural toppings and artisanal syrups. Defined by nature, refined by quality."
              />
            </p>
            <div className="flex gap-5">
              <Link
                href={`${facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500  hover:text-[#155dfc] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link
                href={`https://wa.me/+20${tel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#00a63d] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </Link>
              <Link
                href={`${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#fc6a1c] transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* 2. Exploration */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">
              <LocalizedText id="footer_nav_title" fallback="Navigation" />
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  <LocalizedText id="footer_our_story" fallback="Our Story" />
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors duration-200"
                >
                  <LocalizedText
                    id="footer_products"
                    fallback="Product Collection"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  <LocalizedText
                    id="footer_blog"
                    fallback="The Journal (Blog)"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  <LocalizedText
                    id="footer_partnerships"
                    fallback="Partnerships"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">
              <LocalizedText id="footer_support_title" fallback="Support" />
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="w-3 h-3 mt-1 text-secondary" />
                <Link
                  href={`tel:+20${support}`}
                  className="hover:text-white transition-colors"
                >
                  0{support}
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="w-3 h-3 mt-1 text-secondary" />
                <Link
                  href={`mailto:${gmail}`}
                  className="hover:text-white transition-colors"
                >
                  {gmail}
                </Link>
              </li>
              <li className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="w-3 h-3 mt-1 text-secondary group-hover:scale-110 transition-transform shrink-0" />
                <span className="leading-tight">
                  <Link
                    href="https://maps.app.goo.gl/f1Bj3UmhxLmkqFog9?g_st=iw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-secondary transition-colors cursor-pointer"
                  >
                    <LocalizedText
                      id="footer_location"
                      fallback="Third Industrial Zone, Cairo–Alexandria Ag. Road, Banha, Egypt"
                    />
                  </Link>
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Interactive QR */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">
              <LocalizedText
                id="footer_instant_access"
                fallback="Instant Access"
              />
            </h4>
            <div className="bg-white p-2 rounded-xl inline-block group cursor-pointer overflow-hidden">
              <Image
                src="/images/qr-code.webp"
                alt="QR Code"
                width={100}
                height={100}
              />
            </div>
            <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
              <LocalizedText id="footer_scan_qr" fallback="Scan for catalog" />
            </p>
          </div>
        </div>

        {/* Legal & Footer Bottom */}
        <div className="border-t border-gray-900 pt-2 mt-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] uppercase tracking-widest font-medium text-gray-600">
            <p>
              &copy; {currentYear} Akula Topping.{" "}
              <LocalizedText
                id="footer_copyright"
                fallback="All Rights Reserved."
              />
            </p>
            <div className="flex gap-8">
              <span className="text-gray-400">
                <LocalizedText
                  id="footer_taglines"
                  fallback="100% Natural, Premium Quality, Authentic Taste"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
