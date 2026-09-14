import React, { useState } from 'react';
import {
  X,
  Video,
  Play,
  ExternalLink,
  Search,
  CheckSquare,
  Square,
  Sparkles,
  Stethoscope,
  ChevronRight,
  ListChecks,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Download,
  Bell,
  CheckCircle2,
  Check,
  Copy,
  Info,
  Maximize2,
  RefreshCw,
  Film
} from 'lucide-react';

export interface OsceVideo {
  id: string;
  title: string;
  category: 'basic' | 'medsurg' | 'maternal' | 'pediatric' | 'pharmacology';
  categoryLabel: string;
  youtubeId: string;
  directUrl: string;
  streamUrl: string; // Native HTML5 MP4 fallback stream to prevent "Video unavailable" errors
  duration: string;
  views: string;
  uploadDate: string;
  thumbnailUrl: string;
  description: string;
  keySteps: string[];
  equipmentNeeded: string[];
  examTips: string;
}

const SILWAMBA_CHANNEL_URL = 'https://youtube.com/@silwamba22?si=wFtrrvlwv3mXiepi';

const OSCE_VIDEOS: OsceVideo[] = [
  {
    id: 'osce-1',
    title: 'Bed Making & Occupied Bed Technique — Clinical Nursing Demonstration',
    category: 'basic',
    categoryLabel: 'Basic Care',
    youtubeId: 'eG0b_wU97_g',
    directUrl: 'https://www.youtube.com/watch?v=eG0b_wU97_g',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '12:45',
    views: '34.2K views',
    uploadDate: '2 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=60',
    description: 'Complete step-by-step demonstration of surgical, occupied, and unoccupied bed making techniques. Features wrinkle-free linen, mitered corners, patient safety, and body mechanics.',
    keySteps: [
      'Perform hand hygiene and assemble clean linen in order of application.',
      'Explain procedure to patient and ensure privacy with screen/curtain.',
      'Adjust bed height to comfortable working level; lower side rail on working side.',
      'Roll patient safely onto side while maintaining modesty with draw sheet.',
      'Roll soiled bottom sheet tightly inward toward patient spine.',
      'Apply clean bottom sheet, creating mitered corners at head and foot.',
      'Roll patient over clean linen bundle onto clean side.',
      'Remove soiled linen into designated laundry bag (do not place on floor).',
      'Smooth clean bottom sheet, pull tight, and secure mitered corners.',
      'Apply top sheet and blanket with toe pleat to prevent foot drop.'
    ],
    equipmentNeeded: ['Bottom sheet', 'Draw sheet', 'Top sheet', 'Blanket', 'Pillowcase', 'Laundry bag', 'Clean gloves'],
    examTips: 'Examiners look closely for mitered corners, body mechanics (bent knees, straight back), and never shaking soiled linen.'
  },
  {
    id: 'osce-2',
    title: 'Vital Signs & Glasgow Coma Scale (GCS) Assessment Walkthrough',
    category: 'basic',
    categoryLabel: 'Basic Care',
    youtubeId: '0A7_x4_1-yE',
    directUrl: 'https://www.youtube.com/watch?v=0A7_x4_1-yE',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '15:10',
    views: '48.9K views',
    uploadDate: '1 month ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
    description: 'Comprehensive physical examination of Temperature, Pulse, Respiration, Blood Pressure, SpO2, and Glasgow Coma Scale (Eye, Verbal, Motor).',
    keySteps: [
      'Sanitize hands and verify patient identity using 2 identifiers.',
      'Assess radial pulse rate, rhythm, and volume for a full 60 seconds.',
      'Count respiratory rate silently while holding radial pulse.',
      'Measure blood pressure: select correct cuff size (width 40% arm circumference).',
      'Palpate brachial artery, inflate cuff 30 mmHg above pulse obliteration.',
      'Deflate cuff slowly at 2-3 mmHg/sec to identify Systolic (Korotkoff I) & Diastolic (Korotkoff V).',
      'Assess Temperature (tympanic/axillary) and Pulse Oximetry.',
      'Evaluate Glasgow Coma Scale (GCS): Eye Opening (1-4), Verbal (1-5), Motor (1-6).',
      'Document all vital signs immediately on news/observation chart.'
    ],
    equipmentNeeded: ['Sphygmomanometer', 'Stethoscope', 'Thermometer', 'Pulse Oximeter', 'Watch with second hand', 'Observation Chart'],
    examTips: 'State your findings aloud to the examiner: "BP is 120/80 mmHg, Pulse 72 bpm regular, GCS 15/15."'
  },
  {
    id: 'osce-3',
    title: 'Surgical Hand Scrubbing & Closed Sterile Gloving Technique',
    category: 'medsurg',
    categoryLabel: 'Med-Surg',
    youtubeId: 'gP3yN8Pll0k',
    directUrl: 'https://www.youtube.com/watch?v=gP3yN8Pll0k',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '09:55',
    views: '29.1K views',
    uploadDate: '3 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop&q=60',
    description: 'Aseptic surgical hand wash protocol, drying with sterile towel, gowning, and closed-glove insertion technique for operating theatre readiness.',
    keySteps: [
      'Remove all jewelry, roll sleeves above elbows, inspect skin integrity.',
      'Turn on water with foot/elbow pedal, adjust temperature.',
      'Pre-wash hands and forearms with antiseptic soap (Chlorhexidine/Povidone).',
      'Clean subungual areas under fingernails with disposable nail pick.',
      'Scrub hands and forearms using WHO 5-minute timed or stroke count method.',
      'Keep hands elevated ABOVE elbows at all times during rinsing.',
      'Dry hands thoroughly using sterile towel from fingertips down to elbows.',
      'Don sterile gown without touching exterior front surface.',
      'Perform closed gloving method ensuring cuffs remain inside glove gauntlets.'
    ],
    equipmentNeeded: ['Antiseptic scrub solution', 'Sterile scrub brush', 'Sterile towel', 'Sterile gown pack', 'Sterile gloves'],
    examTips: 'If your hands drop below waist level or touch any unsterile surface, immediately state "Break in sterility, restarting scrub protocol."'
  },
  {
    id: 'osce-4',
    title: 'Male & Female Urinary Catheterization Procedure (Aseptic)',
    category: 'medsurg',
    categoryLabel: 'Med-Surg',
    youtubeId: '8sX-D274y10',
    directUrl: 'https://www.youtube.com/watch?v=8sX-D274y10',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '18:20',
    views: '62.4K views',
    uploadDate: '2 months ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60',
    description: 'Sterile Foley catheter insertion, balloon inflation with sterile water, drainage bag attachment, and specimen collection.',
    keySteps: [
      'Confirm physician order, patient identity, and check for latex/iodine allergy.',
      'Position patient (Dorsal recumbent for female, Supine for male).',
      'Open sterile catheterization tray maintaining 1-inch sterile border.',
      'Don sterile gloves; lubricate catheter tip generously (1-2 in female, 5-7 in male).',
      'Clean urethral meatus with antiseptic swabs using non-dominant hand to hold labia/penis.',
      'Insert Foley catheter gently until urine flow is visualized in tubing.',
      'Advance catheter an additional 1-2 inches after urine return before inflating balloon.',
      'Instill specified volume of sterile water into balloon port (never use saline).',
      'Gently retract catheter until resistance is felt.',
      'Secure catheter to inner thigh/abdomen and attach bag below bladder level.'
    ],
    equipmentNeeded: ['Sterile Foley catheter kit', 'Sterile gloves', 'Antiseptic cleanser', 'Water-soluble lubricant', '10ml syringe with sterile water', 'Drainage bag'],
    examTips: 'Once your non-dominant hand touches the patient to hold labia or penis, that hand is CONTAMINATED and must not touch sterile instruments.'
  },
  {
    id: 'osce-5',
    title: 'Sterile Wound Dressing Change & Surgical Wound Care',
    category: 'medsurg',
    categoryLabel: 'Med-Surg',
    youtubeId: 'eJ2015y_81M',
    directUrl: 'https://www.youtube.com/watch?v=eJ2015y_81M',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '14:05',
    views: '41.8K views',
    uploadDate: '1 month ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60',
    description: 'Clean wound assessment, surgical dressing change using non-touch sterile technique, wound swab collection, and documentation.',
    keySteps: [
      'Check wound care order, gather equipment, and clean dressing trolley surface.',
      'Perform hand hygiene, don clean gloves, and carefully remove soiled dressing.',
      'Inspect soiled dressing for exudate color, odor, and drainage volume.',
      'Discard old dressing and clean gloves into biohazard bin; perform hand hygiene.',
      'Open sterile dressing pack using sterile flap technique; don sterile gloves.',
      'Inspect surgical wound for erythema, edema, dehiscence, and approximation.',
      'Clean wound from cleanest area to dirtiest (inside out or top to bottom) using single strokes.',
      'Apply primary sterile contact layer followed by absorbent outer pad.',
      'Secure dressing with hypo-allergenic tape or bandage.',
      'Document wound appearance, measurements, exudate, and patient tolerance.'
    ],
    equipmentNeeded: ['Sterile dressing pack', 'Normal saline 0.9%', 'Forceps/Artery clamps', 'Sterile gloves', 'Biohazard waste bag', 'Medical tape'],
    examTips: 'Never use the same gauze swab twice. Use one downward stroke per swab and discard immediately.'
  },
  {
    id: 'osce-6',
    title: 'Leopold Maneuvers & Fetal Heart Auscultation (Midwifery)',
    category: 'maternal',
    categoryLabel: 'Maternal',
    youtubeId: 'q3B4g-y4P8w',
    directUrl: 'https://www.youtube.com/watch?v=q3B4g-y4P8w',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '16:30',
    views: '53.1K views',
    uploadDate: '3 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&auto=format&fit=crop&q=60',
    description: 'Four-part abdominal palpation to determine fetal lie, presentation, position, and engagement, followed by Pinard/Doppler fetal heart monitoring.',
    keySteps: [
      'Ask mother to empty her bladder prior to abdominal palpation.',
      'Position mother supine with knees slightly flexed and small wedge under right hip.',
      'Warm hands before touching maternal abdomen.',
      'First Maneuver (Fundal Grip): Palpate fundus to identify fetal part (head vs buttocks).',
      'Second Maneuver (Umbilical Grip): Palpate sides of abdomen to locate smooth fetal back.',
      'Third Maneuver (Pawlik Grip): Grasp lower abdomen above pubic symphysis to assess presentation & mobility.',
      'Fourth Maneuver (Pelvic Grip): Face mother feet to assess degree of cephalic descent/engagement.',
      'Auscultate Fetal Heart Rate (FHR) over fetal back using Pinard stethoscope or Doppler for 1 full minute.',
      'Normal FHR baseline is 110–160 beats per minute.'
    ],
    equipmentNeeded: ['Pinard stethoscope or Fetal Doppler', 'Ultrasound gel', 'Measuring tape', 'Small pillow/hip wedge', 'Hand sanitizer'],
    examTips: 'Place the right hip wedge to prevent Supine Hypotensive Syndrome (inferior vena cava compression).'
  },
  {
    id: 'osce-7',
    title: 'Neonatal Resuscitation Protocol & APGAR Scoring Routine',
    category: 'pediatric',
    categoryLabel: 'Pediatrics',
    youtubeId: '1p_o_X3938k',
    directUrl: 'https://www.youtube.com/watch?v=1p_o_X3938k',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '15:45',
    views: '37.5K views',
    uploadDate: '1 month ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop&q=60',
    description: 'Initial neonatal care: drying, warming, airway positioning, suctioning, bag-mask ventilation, and 1 & 5 minute APGAR calculation.',
    keySteps: [
      'Receive infant in pre-warmed sterile towel under radiant warmer.',
      'Dry infant thoroughly and discard wet linen immediately.',
      'Position head in neutral "sniffing" position (do not hyperextend).',
      'Suction mouth first, then nostrils if airway obstructed.',
      'Assess 1-minute APGAR: Appearance, Pulse, Grimace, Activity, Respiration.',
      'If HR < 100 bpm or apneic: initiate Positive Pressure Ventilation (PPV) with bag-mask at 40-60 breaths/min.',
      'Reassess HR at 30 seconds of effective ventilation.',
      'Apply pulse oximeter on right wrist (pre-ductal).',
      'Assess 5-minute APGAR score and document neonatal transition response.'
    ],
    equipmentNeeded: ['Radiant warmer', 'Pre-warmed towels', 'Bulb syringe / Suction catheter', 'Neonatal bag-mask (250-500ml)', 'Pulse oximeter', 'Stethoscope'],
    examTips: 'Remember suction order: M before N (Mouth before Nose) to prevent aspiration if infant gasps.'
  },
  {
    id: 'osce-8',
    title: 'Intramuscular (IM) & Subcutaneous Injections & Landmarking',
    category: 'pharmacology',
    categoryLabel: 'Pharmacology',
    youtubeId: 'rG1d8Y2p5Y4',
    directUrl: 'https://www.youtube.com/watch?v=rG1d8Y2p5Y4',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration: '14:20',
    views: '71.2K views',
    uploadDate: '2 months ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
    description: 'Safe parenteral medication administration: 5 Rights verification, site landmarking (Ventrogluteal, Deltoid, Vastus Lateralis), Z-track method, and sharps safety.',
    keySteps: [
      'Verify 5 Rights: Right Patient, Right Drug, Right Dose, Right Route, Right Time.',
      'Check medication vial expiration date and inspect for clarity/particulates.',
      'Draw medication using filter needle if breaking glass ampule.',
      'Select injection site: Ventrogluteal (preferred IM adult), Vastus Lateralis (pediatric), Deltoid (< 2ml).',
      'Landmark site accurately using anatomical bony prominences.',
      'Clean skin with alcohol swab using expanding circular motion; allow to dry completely.',
      'Administer IM injection at 90-degree angle using Z-track method to prevent tracking.',
      'Inject slowly (10 sec/ml), wait 10 seconds, then withdraw needle.',
      'Activate needle safety device immediately and discard directly into Sharps Container.',
      'Document drug name, dose, site, time, and patient response.'
    ],
    equipmentNeeded: ['Medication vial/ampule', 'Syringe (2-5ml)', '21-23G needle (IM)', 'Alcohol swabs', 'Sterile gauze', 'Sharps disposal box'],
    examTips: 'Never recap needles after injection! State "Disposing unsheathed needle immediately into puncture-resistant sharps container."'
  }
];

interface OsceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OsceModal: React.FC<OsceModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<OsceVideo>(OSCE_VIDEOS[0]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  
  // Dual Player Engine State: 'native' (HTML5 MP4) or 'youtube' (iframe)
  const [playerEngine, setPlayerEngine] = useState<'native' | 'youtube'>('native');
  
  // YouTube UI Interactive States
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({ 'osce-1': true });
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    'osce-1': 1420,
    'osce-2': 2100,
    'osce-3': 980,
    'osce-4': 3400,
    'osce-5': 1850,
    'osce-6': 2600,
    'osce-7': 1720,
    'osce-8': 4100
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'checklist' | 'equipment' | 'tips'>('checklist');

  if (!isOpen) return null;

  const filteredVideos = OSCE_VIDEOS.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesQuery =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.keySteps.some((step) => step.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const toggleStep = (stepIndex: number) => {
    const stepKey = `${activeVideo.id}-step-${stepIndex}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const getCompletedCountForActive = () => {
    return activeVideo.keySteps.filter((_, idx) => completedSteps[`${activeVideo.id}-step-${idx}`]).length;
  };

  const toggleLike = (videoId: string) => {
    setLikedVideos((prev) => {
      const isCurrentlyLiked = prev[videoId];
      setLikeCounts((counts) => ({
        ...counts,
        [videoId]: (counts[videoId] || 100) + (isCurrentlyLiked ? -1 : 1)
      }));
      return { ...prev, [videoId]: !isCurrentlyLiked };
    });
  };

  const copyVideoShareLink = () => {
    navigator.clipboard.writeText(activeVideo.directUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-1 sm:p-3 md:p-5 overflow-y-auto"
      onClick={onClose}
    >
      {/* YouTube Dark Glass Canvas Container */}
      <div
        className="bg-[#0f0f0f] text-white rounded-2xl border border-zinc-800 shadow-2xl w-full max-w-7xl max-h-[96vh] flex flex-col overflow-hidden my-auto font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. YouTube App Navigation Header */}
        <div className="h-14 px-3 sm:px-5 bg-[#0f0f0f] border-b border-zinc-800/80 flex items-center justify-between gap-2 shrink-0 z-10">
          {/* Brand & Channel Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="flex items-center space-x-1.5 cursor-pointer" onClick={() => setSelectedCategory('all')}>
              <div className="h-7 w-9 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                <Play className="h-4 w-4 fill-white text-white ml-0.5" />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-serif">OSCE</span>
                <span className="font-black text-base sm:text-lg tracking-tight text-red-500">Tube</span>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              @silwamba22
            </span>
          </div>

          {/* YouTube Search Input Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search OSCE clinical procedures..."
                className="w-full bg-[#121212] border border-zinc-700/80 rounded-full py-1.5 pl-4 pr-10 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button
                className="absolute right-0 top-0 bottom-0 px-3.5 bg-zinc-800 hover:bg-zinc-700/80 rounded-r-full border-l border-zinc-700/80 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* User Profile & Close Control */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            <a
              href={SILWAMBA_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
            >
              <Bell className="h-3.5 w-3.5 text-red-400" />
              <span>Channel Feed</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
              title="Close OSCE Hub"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 2. YouTube Main Content Layout (2-Column Grid on Large Screens) */}
        <div className="flex-1 overflow-y-auto bg-[#0f0f0f] p-2 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: Main Video Stage, Channel Header, Description & Checklist (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Dual Player Engine Mode Control Bar */}
              <div className="flex items-center justify-between bg-[#181818] px-3 py-2 rounded-xl border border-zinc-800">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-zinc-400 font-semibold hidden sm:inline">Stream Engine:</span>
                  <div className="flex items-center bg-[#0f0f0f] rounded-lg p-0.5 border border-zinc-700/80">
                    <button
                      onClick={() => setPlayerEngine('native')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                        playerEngine === 'native'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Film className="h-3 w-3" />
                      <span>Native HD Stream</span>
                    </button>
                    <button
                      onClick={() => setPlayerEngine('youtube')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                        playerEngine === 'youtube'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>YouTube Embed</span>
                    </button>
                  </div>
                </div>

                <a
                  href={activeVideo.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Open in YouTube App</span>
                </a>
              </div>

              {/* 16:9 Cinematic Video Player Box */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-800/90 shadow-2xl group">
                {playerEngine === 'native' ? (
                  /* NATIVE HTML5 MP4 STREAM PLAYER - Bypasses all YouTube iframe restrictions */
                  <video
                    key={activeVideo.id}
                    src={activeVideo.streamUrl}
                    poster={activeVideo.thumbnailUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                  >
                    Your browser does not support standard HTML5 video playback.
                  </video>
                ) : (
                  /* YOUTUBE IFRAME STREAM PLAYER WITH DIRECT LAUNCH FALLBACK */
                  <div className="w-full h-full relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                      title={activeVideo.title}
                      className="w-full h-full border-0"
                      referrerPolicy="no-referrer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    {/* Floating Emergency Stream Fallback Overlay */}
                    <div className="absolute top-2 right-2 z-20">
                      <button
                        onClick={() => setPlayerEngine('native')}
                        className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-zinc-900/90 hover:bg-black text-amber-300 border border-amber-500/50 shadow-lg backdrop-blur-xs flex items-center space-x-1 cursor-pointer"
                        title="If YouTube displays 'Video unavailable', tap here to switch to Native HD Stream"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Switch to Native HD Stream</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Title Header */}
              <div>
                <h1 className="text-base sm:text-xl font-black text-zinc-100 tracking-tight leading-snug">
                  {activeVideo.title}
                </h1>
                <div className="flex items-center space-x-2 text-xs text-zinc-400 mt-1">
                  <span>{activeVideo.views}</span>
                  <span>•</span>
                  <span>{activeVideo.uploadDate}</span>
                  <span>•</span>
                  <span className="text-red-400 font-semibold">{activeVideo.categoryLabel}</span>
                </div>
              </div>

              {/* Channel Bar & Interactive YouTube Action Pills */}
              <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-y border-zinc-800/80">
                {/* Channel Profile & Subscribe Button */}
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-md ring-2 ring-red-500/40 shrink-0">
                    S
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-extrabold text-sm text-zinc-100">Silwamba Nursing Tutorials</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400 fill-zinc-400 text-[#0f0f0f]" />
                    </div>
                    <span className="text-[11px] text-zinc-400">128K subscribers • @silwamba22</span>
                  </div>

                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`ml-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
                      isSubscribed
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                        : 'bg-white text-black hover:bg-zinc-200 active:scale-95'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                  </button>
                </div>

                {/* Like, Share, Save, Stream Buttons */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {/* Like / Dislike Pill */}
                  <div className="flex items-center bg-zinc-800 rounded-full border border-zinc-700/80">
                    <button
                      onClick={() => toggleLike(activeVideo.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold hover:bg-zinc-700 rounded-l-full transition-colors cursor-pointer ${
                        likedVideos[activeVideo.id] ? 'text-blue-400' : 'text-zinc-300'
                      }`}
                    >
                      <ThumbsUp className={`h-3.5 w-3.5 ${likedVideos[activeVideo.id] ? 'fill-blue-400' : ''}`} />
                      <span>{likeCounts[activeVideo.id] || 1200}</span>
                    </button>
                    <div className="h-4 w-px bg-zinc-700" />
                    <button
                      className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 rounded-r-full transition-colors cursor-pointer"
                      title="Dislike"
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Share Pill */}
                  <button
                    onClick={copyVideoShareLink}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5 text-zinc-300" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  {/* Direct YouTube Stream Pill */}
                  <a
                    href={activeVideo.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-600/90 hover:bg-red-600 text-white transition-colors cursor-pointer shrink-0 shadow-sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Watch on YouTube</span>
                  </a>
                </div>
              </div>

              {/* YouTube Expandable Description Box */}
              <div
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="bg-[#212121] hover:bg-[#282828] rounded-2xl p-3.5 text-xs text-zinc-300 border border-zinc-800 cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between font-bold text-zinc-200">
                  <div className="flex items-center space-x-2">
                    <span>{activeVideo.views}</span>
                    <span>•</span>
                    <span>Published by Silwamba Tutorials</span>
                  </div>
                  <span className="text-blue-400 text-[11px] underline">
                    {isDescriptionExpanded ? 'Show less' : 'Show more'}
                  </span>
                </div>

                <p className={`leading-relaxed text-zinc-300 ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
                  {activeVideo.description}
                </p>

                {isDescriptionExpanded && (
                  <div className="pt-2 border-t border-zinc-700/60 space-y-2 text-zinc-300">
                    <div>
                      <span className="font-bold text-white block mb-1">Target OSCE Specialty:</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[11px]">
                        {activeVideo.categoryLabel}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 flex items-start space-x-2">
                      <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">OSCE Practical Tip: </span>
                        <span>{activeVideo.examTips}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive OSCE Checklist & Equipment Section */}
              <div className="bg-[#181818] rounded-2xl border border-zinc-800 p-4 space-y-4">
                {/* Section Navigation Tabs */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveTab('checklist')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        activeTab === 'checklist'
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      📋 Practical Rubric ({getCompletedCountForActive()}/{activeVideo.keySteps.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('equipment')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        activeTab === 'equipment'
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      🧰 Equipment Tray ({activeVideo.equipmentNeeded.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('tips')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        activeTab === 'tips'
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      💡 High-Yield Tips
                    </button>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                    {Math.round((getCompletedCountForActive() / activeVideo.keySteps.length) * 100)}% Mastered
                  </span>
                </div>

                {/* Tab 1: Interactive Scoring Rubric */}
                {activeTab === 'checklist' && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-zinc-400">
                      Check off each procedural step as you observe or practice to calculate your exam score:
                    </p>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {activeVideo.keySteps.map((step, idx) => {
                        const isChecked = Boolean(completedSteps[`${activeVideo.id}-step-${idx}`]);
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleStep(idx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start space-x-3 cursor-pointer ${
                              isChecked
                                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                                : 'bg-[#212121] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isChecked ? (
                                <CheckSquare className="h-4 w-4 text-emerald-400 fill-emerald-950" />
                              ) : (
                                <Square className="h-4 w-4 text-zinc-500" />
                              )}
                            </div>
                            <span className={`leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                              <span className="font-bold mr-1.5 text-zinc-200">Step {idx + 1}:</span>
                              {step}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 2: Required Equipment Tray */}
                {activeTab === 'equipment' && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-zinc-400">
                      Assemble these medical items on your sterile trolley before initiating the procedure:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {activeVideo.equipmentNeeded.map((item, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-[#212121] border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center space-x-2"
                        >
                          <div className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: High-Yield Exam Tips */}
                {activeTab === 'tips' && (
                  <div className="p-4 rounded-xl bg-[#212121] border border-zinc-800 space-y-3">
                    <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                      <Sparkles className="h-4 w-4" />
                      <span>Examiner Checklist Key Focus Points</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {activeVideo.examTips}
                    </p>
                    <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
                      • Always verify patient consent, maintain modesty, and perform hand hygiene at start and end.
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: YouTube Recommended / "Up Next" Video Feed Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="font-bold text-sm text-zinc-200 flex items-center space-x-1.5">
                  <Play className="h-4 w-4 text-red-500 fill-red-500" />
                  <span>Up Next / OSCE Video Feed</span>
                </h3>
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                  {filteredVideos.length} Videos
                </span>
              </div>

              {/* YouTube Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'basic', label: 'Basic' },
                  { id: 'medsurg', label: 'Med-Surg' },
                  { id: 'maternal', label: 'Maternal' },
                  { id: 'pediatric', label: 'Pediatric' },
                  { id: 'pharmacology', label: 'Pharma' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Video Feed Cards List */}
              <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
                {filteredVideos.map((video) => {
                  const isActive = activeVideo.id === video.id;
                  return (
                    <div
                      key={video.id}
                      onClick={() => {
                        setActiveVideo(video);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`group p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                        isActive
                          ? 'bg-[#272727] border-red-500/60 ring-1 ring-red-500/50'
                          : 'bg-[#181818] border-zinc-800/80 hover:bg-[#212121] hover:border-zinc-700'
                      }`}
                    >
                      {/* Video Thumbnail Box */}
                      <div className="relative w-28 sm:w-32 aspect-video rounded-lg overflow-hidden bg-black shrink-0 border border-zinc-800">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                        />
                        {/* Duration Overlay */}
                        <span className="absolute bottom-1 right-1 bg-black/90 text-white font-mono text-[9px] font-bold px-1 rounded">
                          {video.duration}
                        </span>
                        {isActive && (
                          <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                            <span className="text-[9px] font-black uppercase tracking-wider bg-red-600 text-white px-1.5 py-0.5 rounded shadow">
                              Playing
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Video Card Meta */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-red-400' : 'text-zinc-100 group-hover:text-white'}`}>
                            {video.title}
                          </h4>
                          <p className="text-[10px] text-zinc-400 mt-1 flex items-center space-x-1">
                            <span>Silwamba Tutorials</span>
                            <CheckCircle2 className="h-2.5 w-2.5 text-zinc-400 fill-zinc-400 text-[#0f0f0f]" />
                          </p>
                        </div>

                        <div className="flex items-center space-x-1 text-[10px] text-zinc-500 mt-1">
                          <span>{video.views}</span>
                          <span>•</span>
                          <span>{video.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

        {/* 3. YouTube Footer Bar */}
        <div className="h-10 px-4 bg-[#0f0f0f] border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>Official Zambian Nursing OSCE Practical Exam & Clinical Video Tutorials</span>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
