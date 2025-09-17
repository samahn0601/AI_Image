import { PhotoType, PhotoSpec, ProfileSpec } from './types';

export const PHOTO_SPECS: Record<PhotoType, PhotoSpec> = {
  [PhotoType.Passport]: {
    name: '여권 사진 (Passport)',
    size: '3.5cm x 4.5cm',
    features: ['흰색 배경', '양쪽 귀 노출', '안경/모자 제거', '무표정', '정면 응시'],
    prompt: `Critically edit this user-uploaded photo to meet the extremely strict regulations for a Republic of Korea passport photo. The final image dimensions MUST be equivalent to 3.5cm x 4.5cm, and the aspect ratio MUST be strictly 3.5:4.5. The retouching must be subtle and preserve the subject's core identity. Adhere to all rules without exception.
1. **Prohibited Items (MUST REMOVE):**
    - **Glasses:** Digitally and completely remove any eyeglasses, sunglasses, or colored lenses. The eyes must be fully visible with no obstruction or reflection.
    - **Headwear:** Remove any hats, caps, or headbands. Do not add them.
    - **Accessories:** Remove any accessories that cause reflections or obscure facial features, such as large earrings, necklaces, or visible piercings. The final image should be free of distracting jewelry.
2. **Background:** Change the background to a completely plain, uniform, and pure white (#FFFFFF) with absolutely no shadows or patterns.
3. **Clothing:** If the subject is wearing white clothing that blends into the background, digitally change it to a simple, non-white colored top (e.g., a dark blue or grey crew-neck shirt). Ensure the clothing does not cover the neck or shoulders in a distracting way.
4. **Pose & Framing:** Adjust posture to be perfectly upright. Center the face in the frame. The head must be straight, not tilted, looking directly at the camera. The distance from the top of the head to the chin should be between 3.2cm and 3.6cm within the 4.5cm height.
5. **Facial Expression & Features:** Enforce a strictly neutral, closed-mouth expression. Both ears and the full facial outline MUST be clearly visible and not obscured by hair.
6. **Regulation-Compliant Retouching:**
    - **Symmetry:** Subtly correct minor facial asymmetry for a more balanced appearance, ensuring eye levels are aligned.
    - **Skin:** Even out skin tone and remove temporary blemishes (like pimples or scratches). Reduce glare or oiliness. The retouching must look completely natural and not alter permanent features like scars or moles.
    - **Hair:** Meticulously tidy any stray hairs that disrupt the silhouette against the white background.
The output MUST be only the final, edited image file, with a strict 3.5:4.5 aspect ratio, without any text, explanation, or additional content.`,
  },
  [PhotoType.License]: {
    name: '운전면허 / 주민등록증 사진',
    size: '3.5cm x 4.5cm',
    features: ['흰색 배경', '얼굴 윤곽 노출', '안경 착용 가능 (반사 없음)', '자연스러운 보정'],
    prompt: `Critically edit this user-uploaded photo to meet the official regulations for a Republic of Korea driver's license and resident registration card. The final output MUST look like a real photograph taken in a professional studio, not an obvious AI-generated image. The final image dimensions MUST be equivalent to 3.5cm x 4.5cm, and the aspect ratio MUST be strictly 3.5:4.5.
1. **Background:** Change the background to a completely plain, uniform, and pure white (#FFFFFF) with no shadows or patterns.
2. **Pose & Framing:** Adjust posture to be upright and formal. Center the face in the frame, with the head straight and looking directly forward.
3. **Facial Expression & Features:** Ensure a strictly neutral expression with the mouth closed. Do not show teeth. While ears do not need to be fully exposed, the entire facial outline (from forehead to chin) must be clearly visible and not obscured by hair or shadows.
4. **Prohibited Items:**
    - **Headwear:** Remove any hats, caps, or headbands.
    - **Colored Lenses/Sunglasses:** Remove any sunglasses or colored contact lenses.
5. **Permitted Items (with adjustments):**
    - **Eyeglasses:** Regular eyeglasses are permitted. If the original photo has glasses with light reflections, digitally remove the reflections and glare from the lenses while keeping the glasses frames. The eyes must be clearly visible through the lenses. Do not remove the glasses themselves unless they are sunglasses.
    - **Accessories:** Small accessories like earrings are fine, but remove any that cause significant reflection or obscure the face.
6. **Natural, Regulation-Compliant Retouching:** The retouching must be extremely subtle and realistic to avoid rejection.
    - **Skin:** Smooth the skin texture naturally, remove temporary blemishes (like pimples), and reduce oiliness. Do not make the skin look plastic-like. Preserve natural skin texture.
    - **Hair:** Neatly tidy any stray hairs.
    - **Lighting:** Correct lighting to remove any shadows on the face and ensure even illumination.
The output MUST be only the final, edited image file, with a strict 3.5:4.5 aspect ratio, without any text, explanation, or additional content.`,
  },
  [PhotoType.Resume]: {
    name: '이력서 사진 (반명함)',
    size: '3cm x 4cm',
    features: ['자연스러운 표정/자신감 있는 미소 2종 생성', '본인 얼굴 특징 유지', '전문적인 리터칭', '단색 배경'],
    prompts: {
      natural: `Critically EDIT this user-uploaded photo to create a professional Korean resume photo (Banmyeongham) with a **natural, confident expression**. The final image dimensions MUST be equivalent to 3cm x 4cm, and the aspect ratio MUST be strictly 3:4. The absolute highest priority is to **MAINTAIN THE SUBJECT'S ORIGINAL FACIAL IDENTITY AND FEATURES**. The goal is enhancement, not alteration. Avoid creating a result that looks significantly different from the original person.
1. **Identity Preservation:** Do NOT change the fundamental shape of the eyes, nose, mouth, or overall face structure. The final image must be clearly recognizable as the same person.
2. **Expression:** Adjust the expression to be relaxed yet confident, projecting competence and approachability. This is not a full smile, but a calm, natural look with a hint of warmth in the eyes. The mouth should be closed and relaxed. Ensure the look is professional and trustworthy.
3. **Background:** Replace the background with a professional, clean, solid color (e.g., light-to-medium cool gray or soft light blue).
4. **Pose & Gaze:** Subtly correct posture to be upright and confident. Ensure the head is straight and looking directly at the camera.
5. **Attire:** If the attire is casual, replace it with a neat, dark-colored business suit or blouse. Ensure the new attire fits the subject's body frame and neckline naturally.
6. **Subtle, Professional Retouching:**
    - **Symmetry & Contouring:** Make only minor adjustments to facial symmetry. If contouring is applied, it must be extremely subtle to add a touch of professional definition without changing the face's natural shape.
    - **Natural Skin:** Retouch skin to remove temporary blemishes (pimples, redness) and reduce excessive shine. CRUCIALLY, preserve the natural skin texture. Do not make it look overly smooth or artificial.
    - **Hair:** Tidy stray hairs and neaten the overall hairstyle, but do not change the hair's fundamental style or color.
The output MUST be only the final, edited image file with a strict 3:4 aspect ratio.`,
      smiling: `Critically EDIT this user-uploaded photo to create a professional Korean resume photo (Banmyeongham) with a **confident, ambitious smile**. The final image dimensions MUST be equivalent to 3cm x 4cm, and the aspect ratio MUST be strictly 3:4. The absolute highest priority is to **MAINTAIN THE SUBJECT'S ORIGINAL FACIAL IDENTITY AND FEATURES**. The goal is enhancement, not alteration. Avoid creating a result that looks significantly different from the original person.
1. **Identity Preservation:** Do NOT change the fundamental shape of the eyes, nose, mouth, or overall face structure. The final image must be clearly recognizable as the same person.
2. **Expression:** Transform the expression into a **confident and engaging smile, clearly distinct from a simple neutral look**. The smile should project positivity and ambition, making the subject look proactive and friendly. A smile with teeth slightly visible is ideal, but it must look genuine and not forced. It should convey competence and a positive attitude.
3. **Background:** Replace the background with a professional, clean, solid color (e.g., light-to-medium cool gray or soft light blue).
4. **Pose & Gaze:** Subtly correct posture to be upright and confident. Ensure the head is straight and looking directly at the camera.
5. **Attire:** If the attire is casual, replace it with a neat, dark-colored business suit or blouse. Ensure the new attire fits the subject's body frame and neckline naturally.
6. **Subtle, Professional Retouching:**
    - **Symmetry & Contouring:** Make only minor adjustments to facial symmetry. If contouring is applied, it must be extremely subtle to add a touch of professional definition withoutchanging the face's natural shape.
    - **Natural Skin:** Retouch skin to remove temporary blemishes (pimples, redness) and reduce excessive shine. CRUCIALLY, preserve the natural skin texture. Do not make it look overly smooth or artificial.
    - **Hair:** Tidy stray hairs and neaten the overall hairstyle, but do not change the hair's fundamental style or color.
The output MUST be only the final, edited image file with a strict 3:4 aspect ratio.`,
    },
  },
  [PhotoType.Profile]: {
    name: '전문 프로필 사진 (Profile)',
    size: '선택 구도 → 3가지 스타일 생성',
    features: ['3가지 전문 구도 선택', '스튜디오급 조명 & 배경', '자신감 있는 표정 연출', '다양한 스타일 제공'],
    styleNames: {
      classic: '클래식',
      modern: '모던',
      cinematic: '시네마틱',
    },
    options: {
      headshot: {
        name: '헤드샷 (얼굴 중심)',
        prompts: {
          classic: `Critically EDIT this photo to create a **Classic Professional Headshot**. Frame from the shoulders up. The highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Lighting:** Soft, flattering studio light (large softbox) for gentle, defining shadows.
- **Background:** Seamless, solid, light-to-medium gray backdrop.
- **Expression:** Confident and approachable. A gentle, closed-mouth smile or neutral expression. Direct eye contact with the camera.
- **Retouching:** Subtle, professional retouching (even skin tone, remove temporary blemishes, preserve texture).
- **Attire:** Morph casual clothing into a simple, professional top (blazer, blouse).
Output MUST be the final edited image only.`,
          modern: `Critically EDIT this photo to create a **Modern Professional Headshot**. Frame from the shoulders up. The highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Lighting:** Crisp, clean lighting to create a sharp, high-quality feel. Use a rim light to separate the subject from the background.
- **Background:** A subtly blurred, bright, minimalist office or a contemporary architectural space.
- **Expression:** Energetic and engaging. A confident, slight smile. Direct eye contact.
- **Retouching:** Clean and sharp. Enhance details in eyes and hair.
- **Attire:** Ensure attire looks modern and professional (e.g., stylish business casual).
Output MUST be the final edited image only.`,
          cinematic: `Critically EDIT this photo to create a **Cinematic Charcoal Headshot**. Frame from the shoulders up. The highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Lighting:** Dramatic, high-contrast lighting (Rembrandt or split lighting) to sculpt the face and create a powerful mood.
- **Background:** A solid, dark charcoal gray backdrop for a bold, sophisticated look.
- **Expression:** Intense, confident, and compelling. A neutral but powerful expression.
- **Retouching:** High-end, polished retouching that emphasizes texture and highlights.
- **Attire:** A simple, dark-colored top to blend with the sophisticated aesthetic.
Output MUST be the final edited image only.`,
        }
      },
      bustShot: {
        name: '바스트샷 (상반신 일부)',
        prompts: {
          classic: `Critically EDIT this photo for a **Classic Professional Bust Shot**. Frame from the chest area up. Highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Pose:** Slight angle to the body, face towards the camera.
- **Lighting:** Traditional three-point studio lighting for a clean, timeless look.
- **Background:** A painted canvas-style backdrop in a neutral color (e.g., muted blue, gray).
- **Expression:** Warm, trustworthy, and professional. A soft, genuine smile.
- **Retouching:** Natural retouching that enhances without altering.
- **Attire:** Classic business attire (suit jacket, blouse).
Output MUST be the final edited image only.`,
          modern: `Critically EDIT this photo for a **Modern Professional Bust Shot**. Frame from the chest area up. Highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Pose:** Natural and relaxed, perhaps leaning slightly forward to engage the viewer.
- **Lighting:** Bright, airy, natural-looking light, as if from a large window.
- **Background:** A clean, modern interior with depth of field, like a stylish workspace or cafe.
- **Expression:** Approachable, friendly, and confident. A genuine, open smile.
- **Retouching:** Fresh and clean retouching.
- **Attire:** Smart business casual that reflects personality.
Output MUST be the final edited image only.`,
          cinematic: `Critically EDIT this photo for a **Cinematic Professional Bust Shot**. Frame from the chest area up. Highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Pose:** A confident, slightly angled pose.
- **Lighting:** Low-key lighting with high contrast to create drama and mood. Focus light on one side of the face.
- **Background:** A dark, textured background or an out-of-focus urban night scene.
- **Expression:** Thoughtful, serious, and compelling.
- **Retouching:** Moody color grading (e.g., cooler tones, desaturated colors) to enhance the cinematic feel.
- **Attire:** Sophisticated, dark-colored clothing.
Output MUST be the final edited image only.`,
        }
      },
      waistUpShot: {
        name: '웨이스트업샷 (상반신)',
        prompts: {
          classic: `Critically EDIT this photo for a **Classic Waist-Up Business Portrait**. Frame from the waist up. Highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Pose:** A traditional business pose, such as arms lightly crossed or one hand in a pocket.
- **Lighting:** Even, professional studio lighting that clearly illuminates the subject.
- **Background:** A simple, professional studio background or a non-distracting office setting.
- **Expression:** Confident, capable, and trustworthy.
- **Retouching:** Standard professional retouching.
- **Attire:** Full business suit or professional dress.
Output MUST be the final edited image only.`,
          modern: `Critically EDIT this photo for a **Modern Waist-Up Lifestyle Portrait**. Frame from the waist up. Highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Pose:** A dynamic and natural pose, showing movement or interaction with the environment (e.g., leaning against a wall, seated at a desk).
- **Lighting:** Natural light that feels authentic and unstaged.
- **Background:** An authentic work environment (e.g., creative studio, workshop, modern office) that tells a story about the person's profession.
- **Expression:** Natural, engaging, and reflective of their personality.
- **Retouching:** Light and natural retouching.
- **Attire:** Professional attire that is authentic to their field.
Output MUST be the final edited image only.`,
          cinematic: `Critically EDIT this photo for a **Cinematic Waist-Up Environmental Portrait**. Frame from the waist up. Highest priority is **MAINTAINING THE SUBJECT'S IDENTITY**.
- **Pose:** A powerful, commanding stance.
- **Lighting:** Highly stylized, directional lighting that creates strong highlights and shadows, interacting with the environment.
- **Background:** An impressive or meaningful location (e.g., overlooking a city, in a striking architectural space) that adds to the narrative.
- **Expression:** A strong, determined, and visionary expression.
- **Retouching:** Cinematic color grading and high-end polishing.
- **Attire:** Sharp, impeccably styled professional wear.
Output MUST be the final edited image only.`,
        }
      },
    },
  } as ProfileSpec,
};