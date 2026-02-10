import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { modelType } = await request.json();

    if (!modelType || !["instant", "versatile"].includes(modelType)) {
      return NextResponse.json(
        { success: false, error: "Invalid model type" },
        { status: 400 }
      );
    }

    // In a real app, you'd save this to a database
    // For now, we'll just acknowledge the preference
    // The actual model selection happens on the client side via localStorage

    return NextResponse.json({
      success: true,
      message: `Model preference updated to ${modelType}`,
    });
  } catch (error) {
    console.error("Failed to update model preference:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update preference" },
      { status: 500 }
    );
  }
}
